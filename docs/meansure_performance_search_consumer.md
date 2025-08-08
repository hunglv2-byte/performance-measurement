# Overview
Do hiệu suất tìm kiếm consumers

# Môi trường
- Môi trường: local
- Accounts: 600.000 records
- Corporations: 300.000 records
- Natural persons: 300.000 records

# Summary kết quả

# Kết quả chi tiết
## Search bằng @ địa chỉ email (Trường hợp nặng nhất)
### * K6 Script：
```
import http from 'k6/http';
import { sleep, check } from 'k6';

const config = {
    nbVus: __ENV.NB_VUS || 10,
    authToken: __ENV.AUTH_TOKEN || 'default_token_if_not_set',
    baseUrl: __ENV.BASE_URL || 'https://api-console.dev.joinsure.jp'
};

export let options = {
    iterations: 100,
    vus: config.nbVus,
    duration: '24h',
    discardResponseBodies: true, //Tắt lưu trữ nội dung response body nhằm tiết kiệm bộ nhớ và tăng hiệu năng, đặc biệt khi bạn không cần xử lý nội dung trả về (body) từ các request HTTP
}

export default function(){
    let payload = JSON.stringify({email: '@'})
    let params = {
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${config.authToken}`,
        }
    }

    let res = http.post(`${config.baseUrl}/consumer-api/v1/consumers/search`, payload, params);

    //Basic check
    check(res, {
        'status is 200': (r) => r.status === 200
    })

    sleep(1); // wait 1 second between iterations
}
```

| Total request (K6 iterations)  | Số lượng chạy song song (K6 vus)  |  SL thành công  | SL fail | Time xử lý trung bình cho 1 request | Remark 
|---                             |---                                |---              |---      |---                                  |---    
| 100                            |   1                               | 100             | 0       | 1.22s                               | [^0] K6 result 
| 100                            |   2                               | 100             | 0       | 1.35s                               | [^1] K6 result
| 100                            |   3                               | 100             | 0       | 1.55s                               | [^2] K6 result
| 100                            |   4                               | 100             | 0       | 1.81s                               | [^3] K6 result
| 100                            |   5                               | 100             | 0       | 1.95s                               | [^4] K6 result
| 100                            |   10                              | 100             | 0       | 3.15s                               | [^9] K6 result
| 100                            |   20                              | 100             | 0       | 7.06s                               | [^10] K6 result
| 100                            |   30                              | 100             | 0       | 10.08s                              | [^11] K6 result
| 100                            |   40                              | 100             | 0       | 13.39s                              | [^12] K6 result
| 100                            |   50                              | 100             | 0       | 15.53s                              | [^13] K6 result
| 100                            |   60                              | 100             | 0       | 18.92s                              | [^14] K6 result
| 100                            |   70                              | 100             | 0       | 20.25s                              | [^15] K6 result


### * [^0] K6 result
```
TOTAL RESULTS 

    checks_total.......................: 100     0.450138/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=1.22s min=1.13s med=1.2s max=1.48s p(90)=1.29s p(95)=1.31s
      { expected_response:true }............................................: avg=1.22s min=1.13s med=1.2s max=1.48s p(90)=1.29s p(95)=1.31s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    0.450138/s

    EXECUTION
    iteration_duration......................................................: avg=2.22s min=2.13s med=2.2s max=2.48s p(90)=2.29s p(95)=2.31s
    iterations..............................................................: 100    0.450138/s
    vus.....................................................................: 1      min=1        max=1
    vus_max.................................................................: 1      min=1        max=1

    NETWORK
    data_received...........................................................: 4.9 MB 22 kB/s
    data_sent...............................................................: 162 kB 730 B/s
```
### * [^1] K6 result
```
 TOTAL RESULTS 

    checks_total.......................: 100     0.848841/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=1.35s min=1.22s med=1.32s max=1.71s p(90)=1.44s p(95)=1.51s
      { expected_response:true }............................................: avg=1.35s min=1.22s med=1.32s max=1.71s p(90)=1.44s p(95)=1.51s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    0.848841/s

    EXECUTION
    iteration_duration......................................................: avg=2.35s min=2.22s med=2.33s max=2.71s p(90)=2.45s p(95)=2.51s
    iterations..............................................................: 100    0.848841/s
    vus.....................................................................: 2      min=2        max=2
    vus_max.................................................................: 2      min=2        max=2

    NETWORK
    data_received...........................................................: 4.9 MB 42 kB/s
    data_sent...............................................................: 162 kB 1.4 kB/s
```
### * [^2] K6 result
``` 
TOTAL RESULTS 

    checks_total.......................: 100     1.167867/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=1.55s min=1.26s med=1.54s max=1.9s p(90)=1.72s p(95)=1.81s
      { expected_response:true }............................................: avg=1.55s min=1.26s med=1.54s max=1.9s p(90)=1.72s p(95)=1.81s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    1.167867/s

    EXECUTION
    iteration_duration......................................................: avg=2.55s min=2.26s med=2.54s max=2.9s p(90)=2.72s p(95)=2.81s
    iterations..............................................................: 100    1.167867/s
    vus.....................................................................: 2      min=2        max=3
    vus_max.................................................................: 3      min=3        max=3

    NETWORK
    data_received...........................................................: 4.9 MB 57 kB/s
    data_sent...............................................................: 162 kB 1.9 kB/s
``` 
### * [^3] K6 result
``` 
        /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 

     execution: local
        script: search-consumers.js
        output: -

     scenarios: (100.00%) 1 scenario, 4 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 4 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     1.406661/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=1.81s min=1.35s med=1.84s max=2.31s p(90)=2.09s p(95)=2.12s
      { expected_response:true }............................................: avg=1.81s min=1.35s med=1.84s max=2.31s p(90)=2.09s p(95)=2.12s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    1.406661/s

    EXECUTION
    iteration_duration......................................................: avg=2.81s min=2.35s med=2.84s max=3.31s p(90)=3.09s p(95)=3.12s
    iterations..............................................................: 100    1.406661/s
    vus.....................................................................: 1      min=1        max=4
    vus_max.................................................................: 4      min=4        max=4

    NETWORK
    data_received...........................................................: 4.9 MB 69 kB/s
    data_sent...............................................................: 162 kB 2.3 kB/s


running (0d00h01m11.1s), 0/4 VUs, 100 complete and 0 interrupted iterations
default ✓ [======================================] 4 VUs  0d00h01m11.1s/24h0m0s  100/100 shared iters
```

### * [^4] K6 result
```
        /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 

     execution: local
        script: search-consumers.js
        output: -

     scenarios: (100.00%) 1 scenario, 5 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 5 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     1.664199/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=1.95s min=1.35s med=1.9s max=3.08s p(90)=2.34s p(95)=2.55s
      { expected_response:true }............................................: avg=1.95s min=1.35s med=1.9s max=3.08s p(90)=2.34s p(95)=2.55s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    1.664199/s

    EXECUTION
    iteration_duration......................................................: avg=2.95s min=2.35s med=2.9s max=4.08s p(90)=3.35s p(95)=3.55s
    iterations..............................................................: 100    1.664199/s
    vus.....................................................................: 1      min=1        max=5
    vus_max.................................................................: 5      min=5        max=5

    NETWORK
    data_received...........................................................: 4.9 MB 82 kB/s
    data_sent...............................................................: 162 kB 2.7 kB/s


running (0d00h01m00.1s), 0/5 VUs, 100 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  0d00h01m00.1s/24h0m0s  100/100 shared iters
```

### * [^9] K6 result
``` 
TOTAL RESULTS 

    checks_total.......................: 100     2.314295/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=3.15s min=1.85s med=3.01s max=4.31s p(90)=3.95s p(95)=4.13s
      { expected_response:true }............................................: avg=3.15s min=1.85s med=3.01s max=4.31s p(90)=3.95s p(95)=4.13s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.314295/s

    EXECUTION
    iteration_duration......................................................: avg=4.15s min=2.85s med=4.01s max=5.31s p(90)=4.95s p(95)=5.13s
    iterations..............................................................: 100    2.314295/s
    vus.....................................................................: 1      min=1        max=10
    vus_max.................................................................: 10     min=10       max=10

    NETWORK
    data_received...........................................................: 4.9 MB 114 kB/s
    data_sent...............................................................: 162 kB 3.8 kB/s
```
### * [^10] K6 result
``` 
       /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 

     execution: local
        script: search-consumers.js
        output: -

     scenarios: (100.00%) 1 scenario, 20 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 20 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     2.307951/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=7.06s min=2.98s med=6.81s max=10.57s p(90)=9.58s  p(95)=9.85s 
      { expected_response:true }............................................: avg=7.06s min=2.98s med=6.81s max=10.57s p(90)=9.58s  p(95)=9.85s 
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.307951/s

    EXECUTION
    iteration_duration......................................................: avg=8.06s min=3.99s med=7.81s max=11.57s p(90)=10.58s p(95)=10.85s
    iterations..............................................................: 100    2.307951/s
    vus.....................................................................: 1      min=1        max=20
    vus_max.................................................................: 20     min=20       max=20

    NETWORK
    data_received...........................................................: 4.9 MB 113 kB/s
    data_sent...............................................................: 162 kB 3.7 kB/s




running (0d00h00m43.3s), 00/20 VUs, 100 complete and 0 interrupted iterations
default ✓ [======================================] 20 VUs  0d00h00m43.3s/24h0m0s  100/100 shared iters
```
### * [^11] K6 result
``` 
     execution: local
        script: search-consumers.js
        output: -

     scenarios: (100.00%) 1 scenario, 30 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 30 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     2.4013/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=10.08s min=2.89s med=10.41s max=14.5s p(90)=12.89s p(95)=13.11s
      { expected_response:true }............................................: avg=10.08s min=2.89s med=10.41s max=14.5s p(90)=12.89s p(95)=13.11s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.4013/s

    EXECUTION
    iteration_duration......................................................: avg=11.08s min=3.89s med=11.41s max=15.5s p(90)=13.89s p(95)=14.11s
    iterations..............................................................: 100    2.4013/s
    vus.....................................................................: 5      min=5        max=30
    vus_max.................................................................: 30     min=30       max=30

    NETWORK
    data_received...........................................................: 4.9 MB 118 kB/s
    data_sent...............................................................: 162 kB 3.9 kB/s
```

### * [^12] K6 result
``` 
     scenarios: (100.00%) 1 scenario, 40 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 40 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     2.333321/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=13.39s min=3.2s med=14.86s max=19.78s p(90)=16.98s p(95)=17.83s
      { expected_response:true }............................................: avg=13.39s min=3.2s med=14.86s max=19.78s p(90)=16.98s p(95)=17.83s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.333321/s

    EXECUTION
    iteration_duration......................................................: avg=14.39s min=4.2s med=15.86s max=20.78s p(90)=17.98s p(95)=18.83s
    iterations..............................................................: 100    2.333321/s
    vus.....................................................................: 5      min=5        max=40
    vus_max.................................................................: 40     min=40       max=40

    NETWORK
    data_received...........................................................: 4.9 MB 115 kB/s
    data_sent...............................................................: 162 kB 3.8 kB/s
```

### * [^13] K6 result
``` 
     scenarios: (100.00%) 1 scenario, 50 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 50 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     2.384235/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=15.53s min=3.16s med=17.81s max=23.67s p(90)=20.43s p(95)=20.86s
      { expected_response:true }............................................: avg=15.53s min=3.16s med=17.81s max=23.67s p(90)=20.43s p(95)=20.86s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.384235/s

    EXECUTION
    iteration_duration......................................................: avg=16.53s min=4.16s med=18.81s max=24.68s p(90)=21.43s p(95)=21.86s
    iterations..............................................................: 100    2.384235/s
    vus.....................................................................: 5      min=5        max=50
    vus_max.................................................................: 50     min=50       max=50

    NETWORK
    data_received...........................................................: 4.9 MB 117 kB/s
    data_sent...............................................................: 162 kB 3.9 kB/s
```

### * [^14] K6 result
```
     scenarios: (100.00%) 1 scenario, 60 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 60 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     2.215174/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=18.92s min=3.14s med=22.92s max=27.12s p(90)=26.14s p(95)=26.49s
      { expected_response:true }............................................: avg=18.92s min=3.14s med=22.92s max=27.12s p(90)=26.14s p(95)=26.49s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.215174/s

    EXECUTION
    iteration_duration......................................................: avg=19.92s min=4.14s med=23.92s max=28.12s p(90)=27.15s p(95)=27.5s 
    iterations..............................................................: 100    2.215174/s
    vus.....................................................................: 1      min=1        max=60
    vus_max.................................................................: 60     min=60       max=60

    NETWORK
    data_received...........................................................: 4.9 MB 109 kB/s
    data_sent...............................................................: 162 kB 3.6 kB/s
```

### * [^15] K6 result
``` 
    scenarios: (100.00%) 1 scenario, 70 max VUs, 24h0m30s max duration (incl. graceful stop):
              * default: 100 iterations shared among 70 VUs (maxDuration: 24h0m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    checks_total.......................: 100     2.271012/s
    checks_succeeded...................: 100.00% 100 out of 100
    checks_failed......................: 0.00%   0 out of 100

    ✓ status is 200

    HTTP
    http_req_duration.......................................................: avg=20.25s min=3.03s med=23.2s max=31.54s p(90)=29.28s p(95)=30.03s
      { expected_response:true }............................................: avg=20.25s min=3.03s med=23.2s max=31.54s p(90)=29.28s p(95)=30.03s
    http_req_failed.........................................................: 0.00%  0 out of 100
    http_reqs...............................................................: 100    2.271012/s

    EXECUTION
    iteration_duration......................................................: avg=21.25s min=4.03s med=24.2s max=32.54s p(90)=30.28s p(95)=31.03s
    iterations..............................................................: 100    2.271012/s
    vus.....................................................................: 1      min=1        max=70
    vus_max.................................................................: 70     min=70       max=70

    NETWORK
    data_received...........................................................: 4.9 MB 112 kB/s
    data_sent...............................................................: 162 kB 3.7 kB/s
```