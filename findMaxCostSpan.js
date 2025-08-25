const planJson = [
  {
    "Plan": {
      "Node Type": "Limit",
      "Parallel Aware": false,
      "Async Capable": false,
      "Startup Cost": 559299.15,
      "Total Cost": 559310.65,
      "Plan Rows": 200,
      "Plan Width": 1392,
      "Actual Startup Time": 6600.506,
      "Actual Total Time": 6626.931,
      "Actual Rows": 200,
      "Actual Loops": 1,
      "Plans": [
        {
          "Node Type": "Unique",
          "Parent Relationship": "Outer",
          "Parallel Aware": false,
          "Async Capable": false,
          "Startup Cost": 559299.15,
          "Total Cost": 573291.14,
          "Plan Rows": 243339,
          "Plan Width": 1392,
          "Actual Startup Time": 5598.461,
          "Actual Total Time": 5624.878,
          "Actual Rows": 200,
          "Actual Loops": 1,
          "Plans": [
            {
              "Node Type": "Sort",
              "Parent Relationship": "Outer",
              "Parallel Aware": false,
              "Async Capable": false,
              "Startup Cost": 559299.15,
              "Total Cost": 559907.49,
              "Plan Rows": 243339,
              "Plan Width": 1392,
              "Actual Startup Time": 5598.459,
              "Actual Total Time": 5624.778,
              "Actual Rows": 200,
              "Actual Loops": 1,
              "Sort Key": ["policies.applied_at DESC", "policies.policy_number DESC", "policies.plan_id", "policies.policy_id", "policies.issued_at", "policies.expired_at", "policies.additional_policy_properties", "policy_statuses.status", "policy_statuses.event_type", "policy_statuses.valid_from", "policy_statuses.remarks", "policy_statuses.actor", "policy_statuses.user_id", "policyholders.additional_policy_properties", "pcn.type", "pnp.full_name", "pnp.yomi", "pcr.name", "pcr.yomi", "(((policies.additional_policy_properties || policyholders.additional_policy_properties) || (alias_36932477.insured_additional_policy_properties -> 0)))", "alias_36932477.insured_names", "alias_36932477.insured_yomis"],
              "Sort Method": "quicksort",
              "Sort Space Used": 1148,
              "Sort Space Type": "Memory",
              "Plans": [
                {
                  "Node Type": "Hash Join",
                  "Parent Relationship": "Outer",
                  "Parallel Aware": false,
                  "Async Capable": false,
                  "Join Type": "Inner",
                  "Startup Cost": 490364.38,
                  "Total Cost": 537529.30,
                  "Plan Rows": 243339,
                  "Plan Width": 1392,
                  "Actual Startup Time": 4177.015,
                  "Actual Total Time": 5619.499,
                  "Actual Rows": 2089,
                  "Actual Loops": 1,
                  "Inner Unique": true,
                  "Hash Cond": "(policy_statuses.policy_id = alias_36932477.policy_id)",
                  "Join Filter": "(SubPlan 1)",
                  "Rows Removed by Join Filter": 297706,
                  "Plans": [
                    {
                      "Node Type": "Gather",
                      "Parent Relationship": "Outer",
                      "Parallel Aware": false,
                      "Async Capable": false,
                      "Startup Cost": 245857.38,
                      "Total Cost": 290414.51,
                      "Plan Rows": 298187,
                      "Plan Width": 1328,
                      "Actual Startup Time": 1138.196,
                      "Actual Total Time": 1188.749,
                      "Actual Rows": 299795,
                      "Actual Loops": 1,
                      "Workers Planned": 2,
                      "Workers Launched": 2,
                      "Single Copy": false,
                      "Plans": [
                        {
                          "Node Type": "Hash Join",
                          "Parent Relationship": "Outer",
                          "Parallel Aware": false,
                          "Async Capable": false,
                          "Join Type": "Left",
                          "Startup Cost": 244857.38,
                          "Total Cost": 259595.81,
                          "Plan Rows": 124245,
                          "Plan Width": 1328,
                          "Actual Startup Time": 1121.076,
                          "Actual Total Time": 1265.178,
                          "Actual Rows": 99932,
                          "Actual Loops": 3,
                          "Inner Unique": true,
                          "Hash Cond": "(policyholders.consumer_record_id = pcr.consumer_record_id)",
                          "Workers": [
                          ],
                          "Plans": [
                            {
                              "Node Type": "Hash Join",
                              "Parent Relationship": "Outer",
                              "Parallel Aware": true,
                              "Async Capable": false,
                              "Join Type": "Left",
                              "Startup Cost": 244846.26,
                              "Total Cost": 259258.55,
                              "Plan Rows": 124245,
                              "Plan Width": 312,
                              "Actual Startup Time": 1121.052,
                              "Actual Total Time": 1256.274,
                              "Actual Rows": 99932,
                              "Actual Loops": 3,
                              "Inner Unique": true,
                              "Hash Cond": "(policyholders.consumer_record_id = pnp.consumer_record_id)",
                              "Workers": [
                              ],
                              "Plans": [
                                {
                                  "Node Type": "Hash Join",
                                  "Parent Relationship": "Outer",
                                  "Parallel Aware": true,
                                  "Async Capable": false,
                                  "Join Type": "Inner",
                                  "Startup Cost": 226284.42,
                                  "Total Cost": 240370.56,
                                  "Plan Rows": 124245,
                                  "Plan Width": 299,
                                  "Actual Startup Time": 513.490,
                                  "Actual Total Time": 622.466,
                                  "Actual Rows": 99932,
                                  "Actual Loops": 3,
                                  "Inner Unique": false,
                                  "Hash Cond": "(pcn.consumer_record_id = policyholders.consumer_record_id)",
                                  "Workers": [
                                  ],
                                  "Plans": [
                                    {
                                      "Node Type": "Seq Scan",
                                      "Parent Relationship": "Outer",
                                      "Parallel Aware": true,
                                      "Async Capable": false,
                                      "Relation Name": "consumers",
                                      "Alias": "pcn",
                                      "Startup Cost": 0.00,
                                      "Total Cost": 12162.15,
                                      "Plan Rows": 375015,
                                      "Plan Width": 20,
                                      "Actual Startup Time": 0.006,
                                      "Actual Total Time": 14.914,
                                      "Actual Rows": 300012,
                                      "Actual Loops": 3,
                                      "Workers": [
                                      ]
                                    },
                                    {
                                      "Node Type": "Hash",
                                      "Parent Relationship": "Inner",
                                      "Parallel Aware": true,
                                      "Async Capable": false,
                                      "Startup Cost": 224731.36,
                                      "Total Cost": 224731.36,
                                      "Plan Rows": 124245,
                                      "Plan Width": 295,
                                      "Actual Startup Time": 511.343,
                                      "Actual Total Time": 511.347,
                                      "Actual Rows": 99932,
                                      "Actual Loops": 3,
                                      "Hash Buckets": 524288,
                                      "Original Hash Buckets": 524288,
                                      "Hash Batches": 1,
                                      "Original Hash Batches": 1,
                                      "Peak Memory Usage": 99136,
                                      "Workers": [
                                      ],
                                      "Plans": [
                                        {
                                          "Node Type": "Hash Join",
                                          "Parent Relationship": "Outer",
                                          "Parallel Aware": true,
                                          "Async Capable": false,
                                          "Join Type": "Inner",
                                          "Startup Cost": 187095.72,
                                          "Total Cost": 224731.36,
                                          "Plan Rows": 124245,
                                          "Plan Width": 295,
                                          "Actual Startup Time": 338.676,
                                          "Actual Total Time": 444.910,
                                          "Actual Rows": 99932,
                                          "Actual Loops": 3,
                                          "Inner Unique": false,
                                          "Hash Cond": "(policyholders.policy_id = policy_statuses.policy_id)",
                                          "Workers": [
                                          ],
                                          "Plans": [
                                            {
                                              "Node Type": "Seq Scan",
                                              "Parent Relationship": "Outer",
                                              "Parallel Aware": true,
                                              "Async Capable": false,
                                              "Relation Name": "policyholders",
                                              "Alias": "policyholders",
                                              "Startup Cost": 0.00,
                                              "Total Cost": 35711.67,
                                              "Plan Rows": 375008,
                                              "Plan Width": 82,
                                              "Actual Startup Time": 0.030,
                                              "Actual Total Time": 38.477,
                                              "Actual Rows": 300006,
                                              "Actual Loops": 3,
                                              "Filter": "((transact_to = '2201-01-01 06:59:59+07'::timestamp with time zone) AND (valid_from <= CURRENT_TIMESTAMP) AND (valid_to > CURRENT_TIMESTAMP))",
                                              "Rows Removed by Filter": 0,
                                              "Workers": [
                                              ]
                                            },
                                            {
                                              "Node Type": "Hash",
                                              "Parent Relationship": "Inner",
                                              "Parallel Aware": true,
                                              "Async Capable": false,
                                              "Startup Cost": 185542.65,
                                              "Total Cost": 185542.65,
                                              "Plan Rows": 124245,
                                              "Plan Width": 213,
                                              "Actual Startup Time": 338.269,
                                              "Actual Total Time": 338.272,
                                              "Actual Rows": 99932,
                                              "Actual Loops": 3,
                                              "Hash Buckets": 524288,
                                              "Original Hash Buckets": 524288,
                                              "Hash Batches": 1,
                                              "Original Hash Batches": 1,
                                              "Peak Memory Usage": 75200,
                                              "Workers": [
                                              ],
                                              "Plans": [
                                                {
                                                  "Node Type": "Hash Join",
                                                  "Parent Relationship": "Outer",
                                                  "Parallel Aware": true,
                                                  "Async Capable": false,
                                                  "Join Type": "Inner",
                                                  "Startup Cost": 73221.43,
                                                  "Total Cost": 185542.65,
                                                  "Plan Rows": 124245,
                                                  "Plan Width": 213,
                                                  "Actual Startup Time": 102.685,
                                                  "Actual Total Time": 280.191,
                                                  "Actual Rows": 99932,
                                                  "Actual Loops": 3,
                                                  "Inner Unique": true,
                                                  "Hash Cond": "(policy_statuses.policy_id = policies.policy_id)",
                                                  "Workers": [
                                                  ],
                                                  "Plans": [
                                                    {
                                                      "Node Type": "Seq Scan",
                                                      "Parent Relationship": "Outer",
                                                      "Parallel Aware": true,
                                                      "Async Capable": false,
                                                      "Relation Name": "policy_statuses",
                                                      "Alias": "policy_statuses",
                                                      "Startup Cost": 0.00,
                                                      "Total Cost": 111342.01,
                                                      "Plan Rows": 373034,
                                                      "Plan Width": 83,
                                                      "Actual Startup Time": 0.038,
                                                      "Actual Total Time": 111.456,
                                                      "Actual Rows": 300006,
                                                      "Actual Loops": 3,
                                                      "Filter": "((transact_to = '2201-01-01 06:59:59+07'::timestamp with time zone) AND (valid_from <= CURRENT_TIMESTAMP) AND (valid_to > CURRENT_TIMESTAMP))",
                                                      "Rows Removed by Filter": 900015,
                                                      "Workers": [
                                                      ]
                                                    },
                                                    {
                                                      "Node Type": "Hash",
                                                      "Parent Relationship": "Inner",
                                                      "Parallel Aware": true,
                                                      "Async Capable": false,
                                                      "Startup Cost": 71660.14,
                                                      "Total Cost": 71660.14,
                                                      "Plan Rows": 124903,
                                                      "Plan Width": 130,
                                                      "Actual Startup Time": 102.315,
                                                      "Actual Total Time": 102.316,
                                                      "Actual Rows": 99932,
                                                      "Actual Loops": 3,
                                                      "Hash Buckets": 524288,
                                                      "Original Hash Buckets": 524288,
                                                      "Hash Batches": 1,
                                                      "Original Hash Batches": 1,
                                                      "Peak Memory Usage": 53824,
                                                      "Workers": [
                                                      ],
                                                      "Plans": [
                                                        {
                                                          "Node Type": "Seq Scan",
                                                          "Parent Relationship": "Outer",
                                                          "Parallel Aware": true,
                                                          "Async Capable": false,
                                                          "Relation Name": "policies",
                                                          "Alias": "policies",
                                                          "Startup Cost": 0.00,
                                                          "Total Cost": 71660.14,
                                                          "Plan Rows": 124903,
                                                          "Plan Width": 130,
                                                          "Actual Startup Time": 29.895,
                                                          "Actual Total Time": 66.839,
                                                          "Actual Rows": 99932,
                                                          "Actual Loops": 3,
                                                          "Filter": "(((agency_code)::text = 'DTKL'::text) AND ((sales_office_code)::text = 'LKTD'::text))",
                                                          "Rows Removed by Filter": 200076,
                                                          "Workers": [
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "Node Type": "Hash",
                                  "Parent Relationship": "Inner",
                                  "Parallel Aware": true,
                                  "Async Capable": false,
                                  "Startup Cost": 13874.15,
                                  "Total Cost": 13874.15,
                                  "Plan Rows": 375015,
                                  "Plan Width": 29,
                                  "Actual Startup Time": 605.671,
                                  "Actual Total Time": 605.671,
                                  "Actual Rows": 300012,
                                  "Actual Loops": 3,
                                  "Hash Buckets": 1048576,
                                  "Original Hash Buckets": 1048576,
                                  "Hash Batches": 1,
                                  "Original Hash Batches": 1,
                                  "Peak Memory Usage": 65504,
                                  "Workers": [
                                  ],
                                  "Plans": [
                                    {
                                      "Node Type": "Seq Scan",
                                      "Parent Relationship": "Outer",
                                      "Parallel Aware": true,
                                      "Async Capable": false,
                                      "Relation Name": "natural_persons",
                                      "Alias": "pnp",
                                      "Startup Cost": 0.00,
                                      "Total Cost": 13874.15,
                                      "Plan Rows": 375015,
                                      "Plan Width": 29,
                                      "Actual Startup Time": 399.080,
                                      "Actual Total Time": 421.338,
                                      "Actual Rows": 300012,
                                      "Actual Loops": 3,
                                      "Workers": [
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "Node Type": "Hash",
                              "Parent Relationship": "Inner",
                              "Parallel Aware": false,
                              "Async Capable": false,
                              "Startup Cost": 10.50,
                              "Total Cost": 10.50,
                              "Plan Rows": 50,
                              "Plan Width": 1048,
                              "Actual Startup Time": 0.011,
                              "Actual Total Time": 0.011,
                              "Actual Rows": 0,
                              "Actual Loops": 3,
                              "Hash Buckets": 1024,
                              "Original Hash Buckets": 1024,
                              "Hash Batches": 1,
                              "Original Hash Batches": 1,
                              "Peak Memory Usage": 8,
                              "Workers": [
                              ],
                              "Plans": [
                                {
                                  "Node Type": "Seq Scan",
                                  "Parent Relationship": "Outer",
                                  "Parallel Aware": false,
                                  "Async Capable": false,
                                  "Relation Name": "corporations",
                                  "Alias": "pcr",
                                  "Startup Cost": 0.00,
                                  "Total Cost": 10.50,
                                  "Plan Rows": 50,
                                  "Plan Width": 1048,
                                  "Actual Startup Time": 0.011,
                                  "Actual Total Time": 0.011,
                                  "Actual Rows": 0,
                                  "Actual Loops": 3,
                                  "Workers": [
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Node Type": "Hash",
                      "Parent Relationship": "Inner",
                      "Parallel Aware": false,
                      "Async Capable": false,
                      "Startup Cost": 235131.80,
                      "Total Cost": 235131.80,
                      "Plan Rows": 750016,
                      "Plan Width": 112,
                      "Actual Startup Time": 3035.932,
                      "Actual Total Time": 3046.646,
                      "Actual Rows": 900018,
                      "Actual Loops": 1,
                      "Hash Buckets": 1048576,
                      "Original Hash Buckets": 1048576,
                      "Hash Batches": 1,
                      "Original Hash Batches": 1,
                      "Peak Memory Usage": 151829,
                      "Plans": [
                        {
                          "Node Type": "Subquery Scan",
                          "Parent Relationship": "Outer",
                          "Parallel Aware": false,
                          "Async Capable": false,
                          "Alias": "alias_36932477",
                          "Startup Cost": 111998.07,
                          "Total Cost": 235131.80,
                          "Plan Rows": 750016,
                          "Plan Width": 112,
                          "Actual Startup Time": 795.478,
                          "Actual Total Time": 2715.050,
                          "Actual Rows": 900018,
                          "Actual Loops": 1,
                          "Plans": [
                            {
                              "Node Type": "Aggregate",
                              "Strategy": "Sorted",
                              "Partial Mode": "Simple",
                              "Parent Relationship": "Subquery",
                              "Parallel Aware": false,
                              "Async Capable": false,
                              "Startup Cost": 111998.07,
                              "Total Cost": 227631.64,
                              "Plan Rows": 750016,
                              "Plan Width": 112,
                              "Actual Startup Time": 795.475,
                              "Actual Total Time": 2671.152,
                              "Actual Rows": 900018,
                              "Actual Loops": 1,
                              "Group Key": ["insureds.policy_id"],
                              "Plans": [
                                {
                                  "Node Type": "Gather Merge",
                                  "Parent Relationship": "Outer",
                                  "Parallel Aware": false,
                                  "Async Capable": false,
                                  "Startup Cost": 111998.07,
                                  "Total Cost": 199506.04,
                                  "Plan Rows": 750016,
                                  "Plan Width": 139,
                                  "Actual Startup Time": 795.430,
                                  "Actual Total Time": 979.338,
                                  "Actual Rows": 900018,
                                  "Actual Loops": 1,
                                  "Workers Planned": 2,
                                  "Workers Launched": 2,
                                  "Plans": [
                                    {
                                      "Node Type": "Sort",
                                      "Parent Relationship": "Outer",
                                      "Parallel Aware": false,
                                      "Async Capable": false,
                                      "Startup Cost": 110998.04,
                                      "Total Cost": 111935.56,
                                      "Plan Rows": 375008,
                                      "Plan Width": 139,
                                      "Actual Startup Time": 778.790,
                                      "Actual Total Time": 824.008,
                                      "Actual Rows": 300006,
                                      "Actual Loops": 3,
                                      "Sort Key": ["insureds.policy_id", "insureds.insured_id"],
                                      "Sort Method": "quicksort",
                                      "Sort Space Used": 52417,
                                      "Sort Space Type": "Memory",
                                      "Workers": [
                                        {
                                          "Worker Number": 0,
                                          "Sort Method": "quicksort",
                                          "Sort Space Used": 49862,
                                          "Sort Space Type": "Memory"
                                        },
                                        {
                                          "Worker Number": 1,
                                          "Sort Method": "quicksort",
                                          "Sort Space Used": 50411,
                                          "Sort Space Type": "Memory"
                                        }
                                      ],
                                      "Plans": [
                                        {
                                          "Node Type": "Hash Join",
                                          "Parent Relationship": "Outer",
                                          "Parallel Aware": false,
                                          "Async Capable": false,
                                          "Join Type": "Left",
                                          "Startup Cost": 35422.80,
                                          "Total Cost": 76278.75,
                                          "Plan Rows": 375008,
                                          "Plan Width": 139,
                                          "Actual Startup Time": 406.303,
                                          "Actual Total Time": 687.260,
                                          "Actual Rows": 300006,
                                          "Actual Loops": 3,
                                          "Inner Unique": true,
                                          "Hash Cond": "(insureds.consumer_record_id = icr.consumer_record_id)",
                                          "Workers": [
                                          ],
                                          "Plans": [
                                            {
                                              "Node Type": "Hash Join",
                                              "Parent Relationship": "Outer",
                                              "Parallel Aware": true,
                                              "Async Capable": false,
                                              "Join Type": "Left",
                                              "Startup Cost": 35411.68,
                                              "Total Cost": 71533.14,
                                              "Plan Rows": 375008,
                                              "Plan Width": 108,
                                              "Actual Startup Time": 406.271,
                                              "Actual Total Time": 662.007,
                                              "Actual Rows": 300006,
                                              "Actual Loops": 3,
                                              "Inner Unique": true,
                                              "Hash Cond": "(insureds.consumer_record_id = inp.consumer_record_id)",
                                              "Workers": [
                                              ],
                                              "Plans": [
                                                {
                                                  "Node Type": "Hash Join",
                                                  "Parent Relationship": "Outer",
                                                  "Parallel Aware": true,
                                                  "Async Capable": false,
                                                  "Join Type": "Inner",
                                                  "Startup Cost": 16849.84,
                                                  "Total Cost": 51986.90,
                                                  "Plan Rows": 375008,
                                                  "Plan Width": 95,
                                                  "Actual Startup Time": 100.905,
                                                  "Actual Total Time": 257.944,
                                                  "Actual Rows": 300006,
                                                  "Actual Loops": 3,
                                                  "Inner Unique": true,
                                                  "Hash Cond": "(insureds.consumer_record_id = icn.consumer_record_id)",
                                                  "Workers": [
                                                  ],
                                                  "Plans": [
                                                    {
                                                      "Node Type": "Seq Scan",
                                                      "Parent Relationship": "Outer",
                                                      "Parallel Aware": true,
                                                      "Async Capable": false,
                                                      "Relation Name": "insureds",
                                                      "Alias": "insureds",
                                                      "Startup Cost": 0.00,
                                                      "Total Cost": 34152.67,
                                                      "Plan Rows": 375008,
                                                      "Plan Width": 91,
                                                      "Actual Startup Time": 0.048,
                                                      "Actual Total Time": 46.598,
                                                      "Actual Rows": 300006,
                                                      "Actual Loops": 3,
                                                      "Filter": "((transact_to = '2201-01-01 06:59:59+07'::timestamp with time zone) AND (valid_from <= CURRENT_TIMESTAMP) AND (valid_to > CURRENT_TIMESTAMP))",
                                                      "Rows Removed by Filter": 0,
                                                      "Workers": [
                                                      ]
                                                    },
                                                    {
                                                      "Node Type": "Hash",
                                                      "Parent Relationship": "Inner",
                                                      "Parallel Aware": true,
                                                      "Async Capable": false,
                                                      "Startup Cost": 12162.15,
                                                      "Total Cost": 12162.15,
                                                      "Plan Rows": 375015,
                                                      "Plan Width": 20,
                                                      "Actual Startup Time": 98.584,
                                                      "Actual Total Time": 98.585,
                                                      "Actual Rows": 300012,
                                                      "Actual Loops": 3,
                                                      "Hash Buckets": 1048576,
                                                      "Original Hash Buckets": 1048576,
                                                      "Hash Batches": 1,
                                                      "Original Hash Batches": 1,
                                                      "Peak Memory Usage": 57568,
                                                      "Workers": [
                                                      ],
                                                      "Plans": [
                                                        {
                                                          "Node Type": "Seq Scan",
                                                          "Parent Relationship": "Outer",
                                                          "Parallel Aware": true,
                                                          "Async Capable": false,
                                                          "Relation Name": "consumers",
                                                          "Alias": "icn",
                                                          "Startup Cost": 0.00,
                                                          "Total Cost": 12162.15,
                                                          "Plan Rows": 375015,
                                                          "Plan Width": 20,
                                                          "Actual Startup Time": 0.031,
                                                          "Actual Total Time": 21.861,
                                                          "Actual Rows": 300012,
                                                          "Actual Loops": 3,
                                                          "Workers": [
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                                {
                                                  "Node Type": "Hash",
                                                  "Parent Relationship": "Inner",
                                                  "Parallel Aware": true,
                                                  "Async Capable": false,
                                                  "Startup Cost": 13874.15,
                                                  "Total Cost": 13874.15,
                                                  "Plan Rows": 375015,
                                                  "Plan Width": 29,
                                                  "Actual Startup Time": 303.172,
                                                  "Actual Total Time": 303.172,
                                                  "Actual Rows": 300012,
                                                  "Actual Loops": 3,
                                                  "Hash Buckets": 1048576,
                                                  "Original Hash Buckets": 1048576,
                                                  "Hash Batches": 1,
                                                  "Original Hash Batches": 1,
                                                  "Peak Memory Usage": 65504,
                                                  "Workers": [
                                                  ],
                                                  "Plans": [
                                                    {
                                                      "Node Type": "Seq Scan",
                                                      "Parent Relationship": "Outer",
                                                      "Parallel Aware": true,
                                                      "Async Capable": false,
                                                      "Relation Name": "natural_persons",
                                                      "Alias": "inp",
                                                      "Startup Cost": 0.00,
                                                      "Total Cost": 13874.15,
                                                      "Plan Rows": 375015,
                                                      "Plan Width": 29,
                                                      "Actual Startup Time": 197.920,
                                                      "Actual Total Time": 220.657,
                                                      "Actual Rows": 300012,
                                                      "Actual Loops": 3,
                                                      "Workers": [
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            },
                                            {
                                              "Node Type": "Hash",
                                              "Parent Relationship": "Inner",
                                              "Parallel Aware": false,
                                              "Async Capable": false,
                                              "Startup Cost": 10.50,
                                              "Total Cost": 10.50,
                                              "Plan Rows": 50,
                                              "Plan Width": 1048,
                                              "Actual Startup Time": 0.020,
                                              "Actual Total Time": 0.020,
                                              "Actual Rows": 0,
                                              "Actual Loops": 3,
                                              "Hash Buckets": 1024,
                                              "Original Hash Buckets": 1024,
                                              "Hash Batches": 1,
                                              "Original Hash Batches": 1,
                                              "Peak Memory Usage": 8,
                                              "Workers": [
                                              ],
                                              "Plans": [
                                                {
                                                  "Node Type": "Seq Scan",
                                                  "Parent Relationship": "Outer",
                                                  "Parallel Aware": false,
                                                  "Async Capable": false,
                                                  "Relation Name": "corporations",
                                                  "Alias": "icr",
                                                  "Startup Cost": 0.00,
                                                  "Total Cost": 10.50,
                                                  "Plan Rows": 50,
                                                  "Plan Width": 1048,
                                                  "Actual Startup Time": 0.019,
                                                  "Actual Total Time": 0.020,
                                                  "Actual Rows": 0,
                                                  "Actual Loops": 3,
                                                  "Workers": [
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "Node Type": "Aggregate",
                      "Strategy": "Plain",
                      "Partial Mode": "Simple",
                      "Parent Relationship": "SubPlan",
                      "Subplan Name": "SubPlan 1",
                      "Parallel Aware": false,
                      "Async Capable": false,
                      "Startup Cost": 2.78,
                      "Total Cost": 2.79,
                      "Plan Rows": 1,
                      "Plan Width": 4,
                      "Actual Startup Time": 0.004,
                      "Actual Total Time": 0.004,
                      "Actual Rows": 0,
                      "Actual Loops": 299795,
                      "Filter": "(count(policies_additional_policy_properties.additional_policy_property) = 1)",
                      "Rows Removed by Filter": 1,
                      "Plans": [
                        {
                          "Node Type": "Subquery Scan",
                          "Parent Relationship": "Outer",
                          "Parallel Aware": false,
                          "Async Capable": false,
                          "Alias": "policies_additional_policy_properties",
                          "Startup Cost": 0.00,
                          "Total Cost": 2.77,
                          "Plan Rows": 1,
                          "Plan Width": 32,
                          "Actual Startup Time": 0.004,
                          "Actual Total Time": 0.004,
                          "Actual Rows": 0,
                          "Actual Loops": 299795,
                          "Filter": "(((policies_additional_policy_properties.additional_policy_property ->> 'name'::text) = '代理店コード'::text) AND (regexp_replace((policies_additional_policy_properties.additional_policy_property ->> 'value'::text), '\n\t'::text, ''::text, 'g'::text) ~~ '%impala%'::text))",
                          "Rows Removed by Filter": 3,
                          "Plans": [
                            {
                              "Node Type": "ProjectSet",
                              "Parent Relationship": "Subquery",
                              "Parallel Aware": false,
                              "Async Capable": false,
                              "Startup Cost": 0.00,
                              "Total Cost": 0.53,
                              "Plan Rows": 100,
                              "Plan Width": 32,
                              "Actual Startup Time": 0.003,
                              "Actual Total Time": 0.003,
                              "Actual Rows": 3,
                              "Actual Loops": 299795,
                              "Plans": [
                                {
                                  "Node Type": "Result",
                                  "Parent Relationship": "Outer",
                                  "Parallel Aware": false,
                                  "Async Capable": false,
                                  "Startup Cost": 0.00,
                                  "Total Cost": 0.01,
                                  "Plan Rows": 1,
                                  "Plan Width": 0,
                                  "Actual Startup Time": 0.000,
                                  "Actual Total Time": 0.000,
                                  "Actual Rows": 1,
                                  "Actual Loops": 299795
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "Planning Time": 13.202,
    "Triggers": [
    ],
    "JIT": {
      "Functions": 264,
      "Options": {
        "Inlining": true,
        "Optimization": true,
        "Expressions": true,
        "Deforming": true
      },
      "Timing": {
        "Generation": 16.405,
        "Inlining": 231.690,
        "Optimization": 1503.915,
        "Emission": 1057.909,
        "Total": 2809.919
      }
    },
    "Execution Time": 6644.609
  }
]

// Collect all nodes with cost span + actual rows
function collectNodes(planNode, result = []) {
  if (!planNode) return result;

  const span = (planNode["Total Cost"] || 0) - (planNode["Startup Cost"] || 0);
  result.push({
    node: planNode["Node Type"],
    costSpan: span,
    actualRows: planNode["Actual Rows"] || 0
  });

  if (planNode.Plans && planNode.Plans.length > 0) {
    for (const child of planNode.Plans) {
      collectNodes(child, result);
    }
  }

  return result;
}

const rootPlan = planJson[0].Plan;
const allNodes = collectNodes(rootPlan);

// Sort by costSpan desc, then actualRows desc
allNodes.sort((a, b) => {
  if (b.costSpan === a.costSpan) {
    return b.actualRows - a.actualRows;
  }
  return b.costSpan - a.costSpan;
});

// Take top 10
const top10 = allNodes.slice(0, 10);

console.log("Top 10 nodes (sorted by costSpan, then actualRows):");
console.table(top10);