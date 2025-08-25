 # SQL
 ```shell
select
	distinct "policy"."policies"."plan_id",
	"policy"."policies"."policy_id",
	"policy"."policies"."policy_number",
	"policy"."policies"."applied_at",
	"policy"."policies"."issued_at",
	"policy"."policies"."expired_at",
	"policy"."policies"."additional_policy_properties",
	"policy"."policy_statuses"."status",
	"policy"."policy_statuses"."event_type",
	"policy"."policy_statuses"."valid_from",
	"policy"."policy_statuses"."remarks",
	"policy"."policy_statuses"."actor",
	"policy"."policy_statuses"."user_id",
	"policy"."policyholders"."additional_policy_properties",
	"pcn"."type",
	"pnp"."full_name",
	"pnp"."yomi",
	"pcr"."name",
	"pcr"."yomi",
	"policy"."policies"."additional_policy_properties" || "policy"."policyholders"."additional_policy_properties" || ("alias_36932477".INSURED_ADDITIONAL_POLICY_PROPERTIES->0) as MERGED_ADDITIONAL_PROPERTY,
	"alias_36932477".INSURED_NAMES,
	"alias_36932477".INSURED_YOMIS
from
	"policy"."policies"
join "policy"."policy_statuses" on
	("policy"."policy_statuses"."policy_id" = "policy"."policies"."policy_id"
		and "policy"."policy_statuses"."valid_from" <= cast(current_timestamp as timestamp with time zone)
			and "policy"."policy_statuses"."valid_to" > cast(current_timestamp as timestamp with time zone)
				and "policy"."policy_statuses"."transact_to" = timestamp with time zone '2200-12-31 23:59:59+00:00')
join "policy"."policyholders" on
	("policy"."policies"."policy_id" = "policy"."policyholders"."policy_id"
		and "policy"."policyholders"."valid_from" <= cast(current_timestamp as timestamp with time zone)
			and "policy"."policyholders"."valid_to" > cast(current_timestamp as timestamp with time zone)
				and "policy"."policyholders"."transact_to" = timestamp with time zone '2200-12-31 23:59:59+00:00')
join "policy"."consumers" as "pcn" on
	"policy"."policyholders"."consumer_record_id" = "pcn"."consumer_record_id"
left outer join "policy"."natural_persons" as "pnp" on
	"policy"."policyholders"."consumer_record_id" = "pnp"."consumer_record_id"
left outer join "policy"."corporations" as "pcr" on
	"policy"."policyholders"."consumer_record_id" = "pcr"."consumer_record_id"
join (
	select
		"alias_45337253"."policy_id" as "policy_id",
		array_agg("alias_45337253"."INSURED_NAME") as INSURED_NAMES,
		array_agg("alias_45337253"."INSURED_YOMI") as INSURED_YOMIS,
		jsonb_agg("alias_45337253"."additional_policy_properties") as INSURED_ADDITIONAL_POLICY_PROPERTIES
	from
		(
		select
			"policy"."insureds"."policy_id",
			case
				when "icn"."type" = cast('NATURAL_PERSON' as "policy"."consumer_type") then "inp"."full_name"
				when "icn"."type" = cast('CORPORATION' as "policy"."consumer_type") then "icr"."name"
			end as "INSURED_NAME",
			case
				when "icn"."type" = cast('NATURAL_PERSON' as "policy"."consumer_type") then "inp"."yomi"
				when "icn"."type" = cast('CORPORATION' as "policy"."consumer_type") then "icr"."yomi"
			end as "INSURED_YOMI",
			"policy"."insureds"."additional_policy_properties"
		from
			"policy"."insureds"
		join "policy"."consumers" as "icn" on
			"policy"."insureds"."consumer_record_id" = "icn"."consumer_record_id"
		left outer join "policy"."natural_persons" as "inp" on
			"policy"."insureds"."consumer_record_id" = "inp"."consumer_record_id"
		left outer join "policy"."corporations" as "icr" on
			"policy"."insureds"."consumer_record_id" = "icr"."consumer_record_id"
		where
			("policy"."insureds"."valid_from" <= cast(current_timestamp as timestamp with time zone)
				and "policy"."insureds"."valid_to" > cast(current_timestamp as timestamp with time zone)
					and "policy"."insureds"."transact_to" = timestamp with time zone '2200-12-31 23:59:59+00:00')
		order by
			"policy"."insureds"."policy_id",
			"policy"."insureds"."insured_id") as "alias_45337253"
	group by
		"alias_45337253"."policy_id") as "alias_36932477" on
	"policy"."policies"."policy_id" = "alias_36932477"."policy_id"
left outer join "policy"."contacts_as_of_application" on
	"policy"."policies"."policy_id" = "policy"."contacts_as_of_application"."policy_id"
where
	"policy"."policies"."policy_number" ilike '%A%' escape '!' -- I have used the pg_trgm extension but inefficient
order by
	"policy"."policies"."applied_at" desc,
	"policy"."policies"."policy_number" desc fetch next 200 rows only;
```

# Explain analyze
```shell
`Limit  (cost=776187.51..776221.81 rows=200 width=1392) (actual time=8385.649..8481.123 rows=200 loops=1)
  ->  Unique  (cost=776187.51..1026709.98 rows=1461058 width=1392) (actual time=7584.039..7679.505 rows=200 loops=1)
        ->  Gather Merge  (cost=776187.51..946351.79 rows=1461058 width=1392) (actual time=7584.039..7679.418 rows=200 loops=1)
              Workers Planned: 2
              Workers Launched: 2
              ->  Sort  (cost=775187.49..776709.42 rows=608774 width=1392) (actual time=7557.531..7558.147 rows=135 loops=3)
                    Sort Key: policies.applied_at DESC, policies.policy_number DESC, policies.plan_id, policies.policy_id, policies.issued_at, policies.expired_at, policies.additional_policy_properties, policy_statuses.status, policy_statuses.event_type, policy_statuses.valid_from, policy_statuses.remarks, policy_statuses.actor, policy_statuses.user_id, policyholders.additional_policy_properties, pcn.type, pnp.full_name, pnp.yomi, pcr.name, pcr.yomi, (((policies.additional_policy_properties || policyholders.additional_policy_properties) || (alias_36932477.insured_additional_policy_properties -> 0))), alias_36932477.insured_names, alias_36932477.insured_yomis
                    Sort Method: quicksort  Memory: 163772kB
                    Worker 0:  Sort Method: quicksort  Memory: 163079kB
                    Worker 1:  Sort Method: quicksort  Memory: 163362kB
                    ->  Parallel Hash Join  (cost=382378.65..500980.46 rows=608774 width=1392) (actual time=5976.482..6886.292 rows=300006 loops=3)
                          Hash Cond: (policy_statuses.policy_id = policies.policy_id)
                          ->  Parallel Seq Scan on policy_statuses  (cost=0.00..111342.01 rows=373034 width=83) (actual time=0.043..127.005 rows=300006 loops=3)
                                Filter: ((transact_to = '2201-01-01 06:59:59+07'::timestamp with time zone) AND (valid_from <= CURRENT_TIMESTAMP) AND (valid_to > CURRENT_TIMESTAMP))
                                Rows Removed by Filter: 900015
                          ->  Parallel Hash  (cost=378472.73..378472.73 rows=312474 width=1357) (actual time=5974.967..5975.573 rows=300006 loops=3)
                                Buckets: 1048576  Batches: 1  Memory Usage: 356192kB
                                ->  Hash Left Join  (cost=338495.59..378472.73 rows=312474 width=1357) (actual time=5231.701..5738.860 rows=300006 loops=3)
                                      Hash Cond: (policyholders.consumer_record_id = pcr.consumer_record_id)
                                      ->  Parallel Hash Left Join  (cost=338484.46..377641.34 rows=312474 width=341) (actual time=5231.683..5710.866 rows=300006 loops=3)
                                            Hash Cond: (policyholders.consumer_record_id = pnp.consumer_record_id)
                                            ->  Parallel Hash Join  (cost=319922.62..358259.26 rows=312474 width=328) (actual time=4336.641..4710.324 rows=300006 loops=3)
                                                  Hash Cond: (policyholders.consumer_record_id = pcn.consumer_record_id)
                                                  ->  Parallel Hash Join  (cost=303072.79..340589.18 rows=312474 width=324) (actual time=4239.552..4507.650 rows=300006 loops=3)
                                                        Hash Cond: (policyholders.policy_id = policies.policy_id)
                                                        ->  Hash Join  (cost=260363.02..297059.08 rows=312507 width=194) (actual time=3944.252..4124.289 rows=300006 loops=3)
                                                              Hash Cond: (policyholders.policy_id = alias_36932477.policy_id)
                                                              ->  Parallel Seq Scan on policyholders  (cost=0.00..35711.67 rows=375008 width=82) (actual time=0.041..46.233 rows=300006 loops=3)
                                                                    Filter: ((transact_to = '2201-01-01 06:59:59+07'::timestamp with time zone) AND (valid_from <= CURRENT_TIMESTAMP) AND (valid_to > CURRENT_TIMESTAMP))
                                                              ->  Hash  (cost=250987.82..250987.82 rows=750016 width=112) (actual time=3941.652..3941.656 rows=900018 loops=3)
                                                                    Buckets: 1048576  Batches: 1  Memory Usage: 151829kB
                                                                    ->  Subquery Scan on alias_36932477  (cost=210111.97..250987.82 rows=750016 width=112) (actual time=1741.233..3633.133 rows=900018 loops=3)
                                                                          ->  GroupAggregate  (cost=210111.97..243487.66 rows=750016 width=112) (actual time=1741.228..3590.583 rows=900018 loops=3)
                                                                                Group Key: insureds.policy_id
                                                                                ->  Sort  (cost=210111.97..212362.02 rows=900018 width=139) (actual time=1741.157..1880.423 rows=900018 loops=3)
                                                                                      Sort Key: insureds.policy_id, insureds.insured_id
                                                                                      Sort Method: quicksort  Memory: 140402kB
                                                                                      Worker 0:  Sort Method: quicksort  Memory: 140402kB
                                                                                      Worker 1:  Sort Method: quicksort  Memory: 140402kB
                                                                                      ->  Hash Left Join  (cost=59048.74..121102.02 rows=900018 width=139) (actual time=510.212..1450.014 rows=900018 loops=3)
                                                                                            Hash Cond: (insureds.consumer_record_id = icr.consumer_record_id)
                                                                                            ->  Hash Left Join  (cost=59037.62..109728.14 rows=900018 width=108) (actual time=510.179..1365.784 rows=900018 loops=3)
                                                                                                  Hash Cond: (insureds.consumer_record_id = inp.consumer_record_id)
                                                                                                  ->  Hash Join  (cost=28662.81..76990.77 rows=900018 width=95) (actual time=231.123..740.598 rows=900018 loops=3)
                                                                                                        Hash Cond: (insureds.consumer_record_id = icn.consumer_record_id)
                                                                                                        ->  Seq Scan on insureds  (cost=0.00..45965.40 rows=900018 width=91) (actual time=0.052..143.434 rows=900018 loops=3)
                                                                                                              Filter: ((transact_to = '2201-01-01 06:59:59+07'::timestamp with time zone) AND (valid_from <= CURRENT_TIMESTAMP) AND (valid_to > CURRENT_TIMESTAMP))
                                                                                                        ->  Hash  (cost=17412.36..17412.36 rows=900036 width=20) (actual time=228.610..228.610 rows=900036 loops=3)
                                                                                                              Buckets: 1048576  Batches: 1  Memory Usage: 53897kB
                                                                                                              ->  Seq Scan on consumers icn  (cost=0.00..17412.36 rows=900036 width=20) (actual time=0.031..49.421 rows=900036 loops=3)
                                                                                                  ->  Hash  (cost=19124.36..19124.36 rows=900036 width=29) (actual time=276.636..276.636 rows=900036 loops=3)
                                                                                                        Buckets: 1048576  Batches: 1  Memory Usage: 62275kB
                                                                                                        ->  Seq Scan on natural_persons inp  (cost=0.00..19124.36 rows=900036 width=29) (actual time=0.040..60.845 rows=900036 loops=3)
                                                                                            ->  Hash  (cost=10.50..10.50 rows=50 width=1048) (actual time=0.018..0.019 rows=0 loops=3)
                                                                                                  Buckets: 1024  Batches: 1  Memory Usage: 8kB
                                                                                                  ->  Seq Scan on corporations icr  (cost=0.00..10.50 rows=50 width=1048) (actual time=0.018..0.018 rows=0 loops=3)
                                                        ->  Parallel Hash  (cost=38022.62..38022.62 rows=374972 width=130) (actual time=294.587..294.588 rows=300008 loops=3)
                                                              Buckets: 1048576  Batches: 1  Memory Usage: 157376kB
                                                              ->  Parallel Seq Scan on policies  (cost=0.00..38022.62 rows=374972 width=130) (actual time=0.087..142.896 rows=300008 loops=3)
                                                                    Filter: ((policy_number)::text ~~* '%A%'::text)
                                                  ->  Parallel Hash  (cost=12162.15..12162.15 rows=375015 width=20) (actual time=94.207..94.207 rows=300012 loops=3)
                                                        Buckets: 1048576  Batches: 1  Memory Usage: 57536kB
                                                        ->  Parallel Seq Scan on consumers pcn  (cost=0.00..12162.15 rows=375015 width=20) (actual time=0.031..20.960 rows=300012 loops=3)
                                            ->  Parallel Hash  (cost=13874.15..13874.15 rows=375015 width=29) (actual time=893.730..893.731 rows=300012 loops=3)
                                                  Buckets: 1048576  Batches: 1  Memory Usage: 65504kB
                                                  ->  Parallel Seq Scan on natural_persons pnp  (cost=0.00..13874.15 rows=375015 width=29) (actual time=580.147..601.424 rows=300012 loops=3)
                                      ->  Hash  (cost=10.50..10.50 rows=50 width=1048) (actual time=0.004..0.004 rows=0 loops=3)
                                            Buckets: 1024  Batches: 1  Memory Usage: 8kB
                                            ->  Seq Scan on corporations pcr  (cost=0.00..10.50 rows=50 width=1048) (actual time=0.004..0.004 rows=0 loops=3)
Planning Time: 11.155 ms
JIT:
  Functions: 275
  Options: Inlining true, Optimization true, Expressions true, Deforming true
  Timing: Generation 14.852 ms, Inlining 157.726 ms, Optimization 1382.422 ms, Emission 1002.633 ms, Total 2557.633 ms
Execution Time: 8510.169 ms` 
```

# Why slow?
``Caused by Distinct``
See at ``optimize-search/solutions-for-search-policies-with-policy-number.md``

# Solution
- Use ``pg_trgm`` extension for substring searches (%A%)
```shell


```