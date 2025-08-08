import http from 'k6/http';
import { sleep, check } from 'k6';

const config = {
    nbVus: __ENV.NB_VUS || 10,
    authToken: __ENV.AUTH_TOKEN || 'default_token_if_not_set',
    baseUrl: __ENV.BASE_URL || 'https://api-console.dev.joinsure.jp',
    iterations: __ENV.ITERATIONS
};

export let options = {
    iterations: config.iterations,
    vus: config.nbVus,
    duration: '24h', //Nếu muốn test đúng 24 giờ, KHÔNG dùng iterations, chỉ dùng duration Vì K6 sẽ dừng khi đủ 100 iterations, dù thời gian chưa hết
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