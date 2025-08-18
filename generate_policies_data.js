import fs from 'fs';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import {formatTimestamp, generateJapaneseName} from './utils/common.js'


// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

faker.locale = 'ja';


// Tổng số bản ghi
const totalPolicies = 5; //900_000;
const totalPolicyIds = []; //900_000;
const totalConsumers = 5; //900_000;

generatePolicies('fake-data/policy.policies.sql')
generatePolicyStatus('fake-data/policy.policy_statuses.sql')
generateConsumer('fake-data/policy.consumers.sql')

function generatePolicies(outputFile){
    const stream = fs.createWriteStream(outputFile);
    stream.write('-- SQL seed data\n\n');

    // *** Insert accounts ***
    stream.write('\n\n');
    stream.write('INSERT INTO policy.policies (TENANT_ID, PLAN_ID, POLICY_ID, ROOT_POLICY_ID, PREVIOUS_POLICY_ID, POLICY_NUMBER, APPLIED_AT, PROVISIONAL_ISSUED_AT, ISSUED_AT, EXPIRED_AT, TERM_AMOUNT, TERM_UNIT, AGENCY_CODE, ADDITIONAL_POLICY_PROPERTIES, PREMIUM_PARAMETER, HAS_RIDER_DETAIL) Values ')
    const fake_PLAN_ID = faker.string.uuid()
    for (let i = 0; i < totalPolicies; i++) {
        const tenantId = 'txssi';
        const PLAN_ID = fake_PLAN_ID;
        const POLICY_ID = faker.string.uuid();
        const ROOT_POLICY_ID = POLICY_ID
        const PREVIOUS_POLICY_ID = null
        const POLICY_NUMBER = generatePolicyNumber(i)
        const APPLIED_AT = formatTimestamp(faker.date.past())
        const PROVISIONAL_ISSUED_AT = formatTimestamp(faker.date.recent())
        const ISSUED_AT = PROVISIONAL_ISSUED_AT
        const EXPIRED_AT = formatTimestamp(faker.date.future({ refDate: new Date('2040-01-01') }));
        const TERM_AMOUNT = 1
        const TERM_UNIT = 'YEAR'
        const AGENCY_CODE = 'AGENCY_CODE'
        const ADDITIONAL_POLICY_PROPERTIES = `[{"name":"${generateJapaneseName()}","value":"AAA"}]`
        const PREMIUM_PARAMETER = '{"性別":"女性","年齢":22}'
        const HAS_RIDER_DETAIL = false

        const values = `('${tenantId}', '${PLAN_ID}', '${POLICY_ID}', '${ROOT_POLICY_ID}', ${PREVIOUS_POLICY_ID}, '${POLICY_NUMBER}', '${APPLIED_AT}', '${PROVISIONAL_ISSUED_AT}', '${ISSUED_AT}',  '${EXPIRED_AT}', ${TERM_AMOUNT}, '${TERM_UNIT}', '${AGENCY_CODE}', '${ADDITIONAL_POLICY_PROPERTIES}', '${PREMIUM_PARAMETER}', ${HAS_RIDER_DETAIL}  )`;
        stream.write(values + (i === (totalPolicies - 1) ? ';\n' : ',\n'));
        console.log(`${values}\n`)

        totalPolicyIds.push(POLICY_ID)
    }

}

function generatePolicyStatus(outputFile){
    const stream = fs.createWriteStream(outputFile);
    stream.write('-- SQL seed data\n\n');

    // *** Insert accounts ***
    stream.write('\n\n');
    stream.write('INSERT INTO policy.POLICY_STATUSES (TENANT_ID, POLICY_ID, STATUS, VALID_FROM, VALID_TO, TRANSACT_FROM, TRANSACT_TO, OPERATED_AT, EVENT_TYPE, REMARKS, ACTOR, USER_ID) Values ')
    const TENANT_ID = 'txssi';
    const statuses = ['UNDERWRITING', 'WAITING_FOR_FIRST_PREMIUM', 'ACCEPTED_BEFORE_ACTIVATION', 'ACTIVE', 'FAILURE', 'TERMINATED', 'WAITING_FOR_RENEWAL', 'RENEWAL_CANCELED', 'RENEWAL_REJECTED', 'RENEWAL_FAILURE', 'UNDERWRITING_FOR_RENEWAL'];
    for (let i = 0; i < totalPolicyIds.length; i++) {
         const POLICY_ID = totalPolicyIds[i]
         const STATUS = faker.helpers.arrayElement(statuses);
         const VALID_FROM = formatTimestamp(faker.date.past())
         const VALID_TO = formatTimestamp(faker.date.future({ refDate: new Date('2040-01-01') }));
         const TRANSACT_FROM = VALID_FROM
         const TRANSACT_TO = formatTimestamp(faker.date.future({ refDate: new Date('2040-01-01') }));
         const OPERATED_AT = VALID_FROM
         const EVENT_TYPE = 'APPLIED'
         const REMARKS = 'APPLIED'
         const ACTOR = 'SYSTEM'
         const USER_ID = null

        const values = `('${TENANT_ID}', '${POLICY_ID}', '${STATUS}', '${VALID_FROM}', '${VALID_TO}', '${TRANSACT_FROM}', '${TRANSACT_TO}', '${OPERATED_AT}', '${EVENT_TYPE}', '${REMARKS}', '${ACTOR}', ${USER_ID} )`;
        stream.write(values + (i === (totalPolicyIds.length - 1) ? ';\n' : ',\n'));
        console.log(`${values}\n`)
    }
}

function generateConsumer(outputFile){
    const stream = fs.createWriteStream(outputFile);
    stream.write('-- SQL seed data\n\n');

    // *** Insert accounts ***
    stream.write('\n\n');
    stream.write('INSERT INTO policy.CONSUMERS (TENANT_ID, CONSUMER_RECORD_ID, TYPE) Values ')
    const TENANT_ID = 'txssi';
    const types = ['NATURAL_PERSON', 'CORPORATION']
    for (let i = 0; i < totalConsumers; i++) {
        const CONSUMER_RECORD_ID = faker.string.uuid()
        const TYPE = faker.helpers.arrayElement(types);

        const values = `('${TENANT_ID}', '${CONSUMER_RECORD_ID}', '${TYPE}' )`;
        stream.write(values + (i === (totalConsumers - 1) ? ';\n' : ',\n'));
        console.log(`${values}\n`)
    }
}


function generateNaturalPersons(outputFile){
    const stream = fs.createWriteStream(outputFile);
    stream.write('-- SQL seed data\n\n');

    // *** Insert accounts ***
    stream.write('\n\n');
    stream.write('INSERT INTO policy.NATURAL_PERSONS (TENANT_ID, CONSUMER_RECORD_ID, FULL_NAME, YOMI, DATE_OF_BIRTH, SEX) Values ')
}


function generatePolicyNumber(id) {
  const year = 2025; // hoặc faker.date.anytime().getFullYear()
  return `A-${String(id).padStart(6, '0')}`;
}