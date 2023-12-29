const Client = require('aliyun-api-gateway').Client;
const client = new Client('203862859','w6H1AuQY29s8bUNVCP2JeF9ANvpeN2zb');
const https = require('https');

// const options = {
//   hostname: 'gyytz.market.alicloudapi.com',
//   port: 443,
//   path: '/sms/smsSend?mobile=15268119204&param=**code**%3A12345%2C**minute**%3A5&smsSignId=2e65b1bb3d054466b82f0c9d125465e2&templateId=908e94ccf08b4476ba6c876d13f084ad',
//   method: 'POST',
//   headers: {
//     'Authorization': 'APPCODE f93d0cdcf60041d18aa07ae71d34c924'
//   }
// };

async function post(tele, num) {
  const options = {
    hostname: 'gyytz.market.alicloudapi.com',
    port: 443,
    path: `/sms/smsSend?mobile=${tele}&param=**code**%3A${num}%2C**minute**%3A5&smsSignId=2e65b1bb3d054466b82f0c9d125465e2&templateId=908e94ccf08b4476ba6c876d13f084ad`,
    method: 'POST',
    headers: {
      'Authorization': 'APPCODE f93d0cdcf60041d18aa07ae71d34c924'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(data)
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}
module.exports = post