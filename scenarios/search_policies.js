import http from 'k6/http';
import { sleep, check } from 'k6';

const config = {
    nbVus: __ENV.NB_VUS || 10,
    authToken: __ENV.AUTH_TOKEN || 'default_token_if_not_set',
    baseUrl: __ENV.BASE_URL || 'https://api-console.dev.joinsure.jp',
    iterations: __ENV.ITERATIONS
};

export const options = {
    discardResponseBodies: true,
    scenarios: {
        vus_1_scenario: {
            executor: 'shared-iterations',
            iterations: 1,
            vus: 1,
            maxDuration: '24h', 
            // startTime: '0s',
            exec: 'test_api',
        },
    },
}

export function test_api() {
  let payload = JSON.stringify({policyholder_email: '@justincase-tech.com'})
    let params = {
        headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${config.authToken}`,
        }
    }

    let res = http.post(`${config.baseUrl}/policy-api/v3/policies/search`, payload, params);
    console.log(res)

    //Basic check
    check(res, {
        'status is 200': (r) => r.status === 200
    })

    sleep(1); // wait 1 second between iterations
}
