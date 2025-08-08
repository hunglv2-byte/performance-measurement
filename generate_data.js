// Change totalRecordsPersons and totalRecordsCorporations

const fs = require('fs');
const { faker } = require('@faker-js/faker');

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

faker.locale = 'ja';

// Tổng số bản ghi
const totalRecordsPersons = 500_000;
const totalRecordsCorporations = 500_000;
const accountUuids = []

generateNaturalPersons('fake-data/consumer.natural_persons.sql')
generateCorporations('fake-data/consumer.corporations.sql')
generateAccounts('fake-data/consumer.accounts.sql')


function generateAccounts(outputFile){
  const stream = fs.createWriteStream(outputFile);
  stream.write('-- SQL seed data\n\n');

    // *** Insert accounts ***
  stream.write('\n\n');
  stream.write('INSERT INTO consumer.accounts (id, consumer_record_id, valid_from, valid_to, transact_from, transact_to, tel, postcode, address, email, auth_user_id, tenant_id) VALUES\n');
  for (let i = 0; i < accountUuids.length; i++) {
    const uuid = faker.string.uuid();
    const consumer_record_id = accountUuids[i]
    const valid_from = formatTimestamp(faker.date.past());
    const valid_to = formatTimestamp(faker.date.future({ refDate: new Date('2050-01-01') })); //formatTimestamp(faker.date.recent());
    const transact_from = formatTimestamp(faker.date.past());
    const transact_to = '2201-01-01T06:59:59+07:00' //formatTimestamp(faker.date.future({ refDate: new Date('2050-01-01') }));
    const tel = faker.phone.number()
    const postcode = faker.location.zipCode();
    const address = generateJapaneseAddress()

    const lastName = faker.person.lastName();
    const randomNumber = faker.number.int({ min: 10000, max: 9999999 });
    const email = faker.internet.email({
      lastName: `${lastName}${randomNumber}`,
    });

    const auth_user_id = 'auth0|62eb8a4e5882d01d1c1ca7e4'
    const tenant_id = 'txssi'
  
    const values = `('${uuid}', '${consumer_record_id}', '${valid_from}', '${valid_to}', '${transact_from}', '${transact_to}', '${tel}', '${postcode}', '${address}', '${email}', '${auth_user_id}', '${tenant_id}')`;

    stream.write(values + (i === (accountUuids.length - 1) ? ';\n' : ',\n'));
    console.log(`${values}\n`)
  }

  stream.end(() => {
    console.log(`✅ Generated ${accountUuids.length} rows in one INSERT INTO in ${outputFile}`);
  });
}


function generateNaturalPersons(outputFile){
  const stream = fs.createWriteStream(outputFile);
  stream.write('-- SQL seed data\n\n');

  // *** Insert natural_persons ***
  stream.write('INSERT INTO consumer.natural_persons (consumer_record_id, name, name_katakana, date_of_birth, sex, tenant_id, created_at, updated_at) VALUES\n');
  for (let i = 1; i <= totalRecordsPersons; i++) {
    const uuid = faker.string.uuid();
    const name = generateJapaneseName(); // Kanji
    const name_katakana = toKatakana(name); // Katakana tương ứng
    const dateOfBirth = faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' }).toISOString().split('T')[0];
    const sex = faker.helpers.arrayElement([1, 2]);
    const tenantId = 'txssi';
    const createdAt = formatTimestamp(faker.date.past());
    const updatedAt = formatTimestamp(faker.date.recent());

    const values = `('${uuid}', '${name}', '${name_katakana}', '${dateOfBirth}', '${sex}', '${tenantId}', '${createdAt}', '${updatedAt}')`;

    stream.write(values + (i === totalRecordsPersons ? ';\n' : ',\n'));
    console.log(`${values}\n`)

    accountUuids.push(uuid)
  }

  stream.end(() => {
    console.log(`✅ Generated ${totalRecordsPersons} rows in one INSERT INTO in ${outputFile}`);
  });
}

function generateCorporations(outputFile){
  const stream = fs.createWriteStream(outputFile);
  stream.write('-- SQL seed data\n\n');

   // *** Insert corporations ***
  stream.write('\n\n');
  stream.write('INSERT INTO consumer.corporations (consumer_record_id, name, name_katakana, tenant_id, created_at, updated_at) VALUES\n');
  for (let i = 1; i <= totalRecordsCorporations; i++) {
    const uuid = faker.string.uuid();
    const name = generateJapaneseName(); // Kanji
    const name_katakana = toKatakana(name); // Katakana tương ứng
    const tenantId = 'txssi';
    const createdAt = formatTimestamp(faker.date.past());
    const updatedAt = formatTimestamp(faker.date.recent());

    const values = `('${uuid}', '${name}', '${name_katakana}', '${tenantId}', '${createdAt}', '${updatedAt}')`;

    stream.write(values + (i === totalRecordsCorporations ? ';\n' : ',\n'));
    console.log(`${values}\n`)

    accountUuids.push(uuid)
  }

  stream.end(() => {
    console.log(`✅ Generated ${totalRecordsCorporations} rows in one INSERT INTO in ${outputFile}`);
  });
}

function generateJapaneseAddress() {
  const prefecture = faker.location.state();   // Tokyo, Osaka, etc.
  const city = faker.location.city();          // Shibuya, etc.
  const block = faker.location.buildingNumber(); // "1-2-3"
  return `${prefecture}${city}${block}`.replace(/'/g, "''");;
}

// Hàm convert Hiragana/Kanji sang Katakana (chuyển từng ký tự Hiragana sang Katakana Unicode)
function toKatakana(str) {
  return str.replace(/[\u3041-\u3096]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

function formatTimestamp(date) {
  return dayjs(date).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss.SSS Z');
}

function generateJapaneseName() {
  const japaneseLastNames = [
    '佐藤','鈴木','高橋','田中','渡辺','伊藤','中村','小林','山本','加藤',
    '吉田','山田','佐々木','山口','松本','井上','木村','清水','林','斎藤',
    '山崎','阿部','森','池田','橋本','山下','石川','中島','前田','小川',
    '岡田','長谷川','坂本','遠藤','石井','西村','福田','太田','三浦','田村',
    '岡本','酒井','藤田','工藤','内田','平野','福島','中野','小野','藤井',
    '大野','片山','谷口','松田','高木','石田','杉山','武田','平田','野口',
    '山崎','渡邊','大塚','柴田','川口','堀口','田島','田中','横山','島田',
    '石井','矢野','原田','米田','野村','岩田','岸本','石黒','浅井','中西',
    '中村','宮崎','磯部','片岡','高田','岡','寺田','住田','秋山','川村',
    '岩佐','小谷','長田','小松','藤原','大川','堺','中尾','高瀬','小森',
    '河合','茂木','広瀬','井口','安藤','石橋','杉田','麻生','谷','服部',
    '坂井','西','久保','宮本','田辺','本田','青木','石谷','高井','諸井',
    '前川','大島','望月','杉本','内藤','高岡','大塚','安田','市川','甲斐',
    '古川','辻','奥村','下村','稲垣','丸山','竹内','小田','今井','武藤',
    '浜田','関','相馬','早川','菅原','宮田','金子','小泉','岩崎','市村',
    '及川','松井','松尾','宮本','高森','大貫','熊谷','山下','佐久間','平井',
    '榎本','原','工藤','橋爪','深谷','細川','若林','伊東','新井','桜井',
    '伴','諏訪','阪本','多田','菊地','吉川','川田','甲斐','木下','辰巳',
    '荒木','丸山','堤','松原','鹿島','松岡','宗像','武井','片山','増田',
    '生田','丸岡','湯浅','小林','椎名','溝口','須藤','畑中','一色','岡崎',
    '小泉','鳥井','羽田','芳賀','丹羽','江口','古賀','小笠原','村田','広田',
    '白石','石森','高柴','鵜飼','斉藤','橋本','竹田','大森','熊谷','三宅',
    '野原','衣川','藤巻','田辺','樋口','潮田','遠山','内海','大橋','亀山',
    '柴崎','蓮見','笠井','行田','小倉','板垣','志賀','糸井','関根','山際',
    '栗田','永田','江藤','泉','柿本','丸谷','藍原','小田島','皆川','長尾',
    '菅','鎌田','城田','徳永','松下','丸子','岩城','木原','内山','三好',
    '横井','西岡','岩本','秋庭','葵','古川','宮城','高尾','岡谷','井関',
    '若狭','古田','永井','水谷','金田','岩見','七尾','小林','高島','箕輪',
    '行田','堀田','安達','西田','行田','橋本','牧野','近藤','村田','菅沼',
    '沢田','小杉','矢部','倉田','望月','小高','小川','栗原','尾崎','坪井',
    '荒井','芝田','竹下','古谷','山岡','石上','多賀','宗田','鳥山','平岡',
    '松谷','東','岩永','多田','米山','杉浦','小泉','柴','古市','東山',
    '新垣','市原','影山','福山','杉山','長尾','堀','森田','藤永','曽根',
    '植田','池上','小松崎','高柳','岸','伊吹','四方','永原','武石','前島',
    '高宮','北村','橋川','斉','戸田','嶋田','成田','城山','平','小川','成瀬',
    '荒川','谷','粟田','塚本','坂','猪瀬','吉岡','服部','堀口','藤沢','馬場'
  ];
  const japaneseFirstNames = [
    '太郎', '花子', '一郎', '美咲', '翔太', '優子', '健太', '明日香', '大輔', '結衣',
    '拓海', '未来', '陽菜', '翔', '悠斗', '葵', '涼介', '紗季', '蓮', '陽翔',
    '結菜', '陽向', '海翔', '怜奈', '悠真', '美優', '蒼', '心愛', '大和', '杏',
    '大翔', '咲良', '隼人', '彩乃', '陽太', '美桜', '陸斗', '玲奈', '匠', '結月',
    '悠', '桜', '琉生', '萌', '颯太', '紗奈', '新', '葵衣', '優斗', '陽菜乃',
    '瑛太', '心結', '空', '鈴', '航太', '菜々', '翔馬', '凛', '湊', '千尋',
    '悠希', '茜', '陽央', '真帆', '龍之介', '瑞希', '奏', '梨花', '陽仁', '七海',
    '壮真', '実咲', '海斗', '萌音', '悠翔', '晴', '翔琉', '琴音', '隼', '望',
    '大智', '結', '陽斗', '悠月', '琉翔', '優菜', '颯真', '心', '湊斗', '陽彩',
    '快', '星奈', '琥太郎', '陽明', '悠生', '柚葉', '勇翔', 'あかり', '陽大', '心春',
    '一真', '陽斗', '拓真', '萌香', '玲', '未来翔', '天音', '奏汰', '実優', '風真',
    '楓', '結翔', '悠汰', '千夏', '遥', '陽翔汰', '颯汰', '碧', '結音', '空良',
    '優真', '柚希', '琉', '結愛', '悠生', '百花', '晴翔', '結梨', '大輝', '怜',
    '聖', '心春', '優月', '怜央', '那月', '愛', '悠仁', '莉子', '壮汰', '結翔',
    '蒼真', '凪', '陽稀', '音羽', '玲音', '真央', '颯大', '陽愛', '陸翔', '陽悠',
    '楓真', '結叶', '琉聖', '悠那', '颯翔', '咲', '悠翔汰', '日向', '陽葵', '凜',
    '快晴', '凛太郎', '凛音', '結夢', '悠里', '瑞樹', '葵翔', '未来音', '優斗翔', '菜月',
    '陽央汰', '夢', '空翔', '心陽', '悠悟', '陽悠翔', '海翔汰', '愛翔', '優太', '陽悠斗',
    '光', '陽翔真', '陽翔汰', '詩音', '輝', '翔陽', '結弦', '結翔汰', '心翔', '蒼翔',
    '璃音', '悠空', '天翔', '陽成', '悠仁翔', '悠翔真', '颯翔汰', '心晴', '風翔', '陽翔弥',
    '怜真', '優弥', '陽翔翔', '湊翔', '結汰', '莉央', '愛莉', '結翔真', '陽翔叶', '蒼空',
    '結翔弥', '海翔真', '翔陽汰', '陽太郎', '風太', '心絆', '優翔太', '悠翔仁', '愛桜', '優翔斗',
    '颯翔弥', '翔汰', '凪翔', '陽翔月', '陽翔翔汰', '優翔真', '心翔真', '陽翔汰郎', '蒼翔真', '海翔翔',
    '悠翔翔', '風翔真', '陽翔翔真', '翔翔', '翔翔太', '翔翔翔', '陽翔陽', '陽翔天', '陽翔颯', '陽翔陽翔',
    '優翔陽翔', '蒼翔陽翔', '翔翔陽翔', '陽翔優翔', '翔翔翔翔', '陽翔翔翔', '陽翔陽翔陽', '翔陽翔翔', '翔翔翔翔', '翔陽翔陽',
    '陽翔陽陽', '陽陽翔陽', '翔翔陽陽', '翔翔翔陽', '陽翔陽翔翔', '陽翔翔陽陽', '陽翔翔翔陽', '翔翔陽翔陽', '翔翔陽翔翔', '陽翔陽陽陽',
    '翔翔翔翔翔', '陽翔翔翔翔', '陽翔翔翔翔翔', '陽翔陽翔陽翔', '翔陽陽翔陽', '翔翔陽翔陽翔', '陽翔陽翔陽翔陽', '陽陽陽翔陽翔', '陽翔陽翔陽翔陽翔', '翔陽陽翔翔翔',
    '翔陽陽陽陽陽', '翔陽翔翔翔翔', '翔翔陽陽陽陽', '陽陽翔翔翔翔', '陽翔陽陽陽陽', '陽翔翔陽陽陽', '陽翔翔翔陽陽', '翔翔陽陽陽陽陽', '陽陽陽陽翔翔', '翔翔翔翔翔翔'
  ];
  const last = faker.helpers.arrayElement(japaneseLastNames);
  const first = faker.helpers.arrayElement(japaneseFirstNames);
  return `${last} ${first}`;
}