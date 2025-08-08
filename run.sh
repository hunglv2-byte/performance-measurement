#!/bin/bash

# docker run --rm -v $(pwd):/scripts --network host  --env-file .env  grafana/k6 run /scripts/test.js

# Define the list of virtual users (VUs) to test with
# vus_list=(1 2 3 4 5 6 7 8 9 10 20 30 50 60 70)
vus_list=(1 2)

# Load environment variables from .env (ignoring comments and blank lines)
export $(grep -vE '^\s*#|^\s*$' .env | xargs)

# Loop over the VU list and run the test
for vus in "${vus_list[@]}"; do
  echo "Running k6 with $vus VUs..."
  k6 run --vus "$vus" search-consumers.js --summary-export="summary-export/result_${vus}.json"
done