🔥 Nice — thanks for pasting the full `EXPLAIN ANALYZE`. Let’s break down where the time goes and what you can do.

---

## 1. Where it’s slow

Looking at the plan:

* **Big Sort + Unique + Limit**

  ```text
  Limit -> Unique -> Gather Merge -> Sort
  actual time ~7.5s – 7.6s
  ```

  → Sorting **\~300k rows × 3 workers** with 160MB RAM each is very expensive.
  → Only **200 rows are needed**, but PostgreSQL sorts everything first.

* **Parallel Seq Scans**
  Many large scans:

    * `policy_statuses` (\~1.2M rows scanned, only 300k used).
    * `policyholders` (\~900k scanned, 300k used).
    * `insureds` (\~900k scanned).
    * `policies` (\~300k scanned with filter `policy_number ~~* '%A%'`).
    * `consumers` & `natural_persons` (\~900k scanned each).

  These Seq Scans + Hash Joins are expected since you have wildcard searches and validity filters.

* **ILIKE / pattern search**:

  ```sql
  Filter: (policy_number ~~* '%A%')
  ```

  → This forces a **full table scan**, since the pattern starts with `%`.

---

## 2. Problems detected

1. **Expensive sort for LIMIT**

    * PostgreSQL is sorting millions of rows just to return 200.
    * Symptom: `Sort Method: quicksort Memory: ~160MB per worker`.

2. **Pattern search (`%A%`)** disables index use.

    * Can’t use btree index.
    * Causes full scan of `policies`.

3. **Many parallel seq scans on “valid\_from/valid\_to” filters**

    * These date-range checks (`valid_from <= now AND valid_to > now`) happen repeatedly on large tables.

---

## 3. Optimizations you can try

### 🟢 Query rewrite for LIMIT

If you’re doing pagination with `ORDER BY policies.applied_at DESC, policies.policy_number DESC ... LIMIT 200`,
try **index-only scan**:

```sql
CREATE INDEX idx_policies_applied_number
ON policies (applied_at DESC, policy_number DESC);
```

Then rewrite query so the **LIMIT is applied earlier**, e.g. subselect:

```sql
SELECT *
FROM (
   SELECT policy_id, applied_at, policy_number
   FROM policies
   WHERE policy_number ILIKE '%A%'
   ORDER BY applied_at DESC, policy_number DESC
   LIMIT 200
) p
JOIN ... other tables ...
```

This avoids sorting/joining millions of rows before LIMIT.

---

### 🟢 Fix pattern search (`%A%`)

* For substring search → use **pg\_trgm**:

  ```sql
  CREATE EXTENSION IF NOT EXISTS pg_trgm;

  CREATE INDEX idx_policies_policy_number_trgm
  ON policies USING gin (policy_number gin_trgm_ops);
  ```

  Then your `policy_number ILIKE '%A%'` will use GIN index.

---

### 🟢 Optimize date range filters

All these tables (`policy_statuses`, `policyholders`, `insureds`) use:

```sql
(transact_to = '2201-01-01 ...') AND valid_from <= now() AND valid_to > now()
```

Index suggestion:

```sql
CREATE INDEX idx_policy_statuses_valid
ON policy_statuses (valid_from, valid_to, transact_to);

CREATE INDEX idx_policyholders_valid
ON policyholders (valid_from, valid_to, transact_to);

CREATE INDEX idx_insureds_valid
ON insureds (valid_from, valid_to, transact_to);
```

Or **partial index** if `transact_to` is almost always `'2201-01-01 ...'`:

```sql
CREATE INDEX idx_policy_statuses_current
ON policy_statuses (valid_from, valid_to)
WHERE transact_to = '2201-01-01 06:59:59+07';
```

---

### 🟢 Reduce width (1392 bytes per row!)

Your plan shows `width=1392`, meaning each row is very wide (lots of big JSON fields?).

* If you don’t need all columns → select fewer fields.
* Wide rows slow down sorting and hashing a lot.

---

### 🟢 Work\_mem tuning

The sort is using \~160MB × 3 workers. You can try increasing `work_mem` per session:

```sql
SET work_mem = '256MB';
```

This might avoid disk spill for larger queries.

---

## ✅ Summary of actions

1. Add **GIN trigram index** for `%...%` search.
2. Add **indexes on validity filters** (`valid_from`, `valid_to`, `transact_to`).
3. Rewrite query so `LIMIT` applies before joins if possible.
4. Add composite index for `(applied_at DESC, policy_number DESC)` to avoid massive sort.
5. Select only needed columns to reduce row width.
6. Tune `work_mem` for heavy sorts.

---

👉 Do you want me to **rewrite your SQL query** with an example subselect + early LIMIT, so the join doesn’t have to sort millions of rows before trimming to 200?
