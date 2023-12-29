(async() => {
    var url = `https://gyytz.market.alicloudapi.com/sms/smsSend?mobile=mobile&param=**code**%3A12345%2C**minute**%3A5&smsSignId=2e65b1bb3d054466b82f0c9d125465e2&templateId=908e94ccf08b4476ba6c876d13f084ad`;
    let appcode = 'f93d0cdcf60041d18aa07ae71d34c924'
    var result = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization:appcode
      }
    });
    const movies = await result.json();
    console.log(movies);
}
)()

// console.log(JSON.parse(result));
// res(JSON.parse(result)) 
// }).catch(e => { 
//   console.log(e);
// })

const Client = require('aliyun-api-gateway').Client;
const client = new Client('203862859','w6H1AuQY29s8bUNVCP2JeF9ANvpeN2zb');

async function post(tele,num) {
  return new Promise(async (res,rej) => {
    var url = `https://dfsmsv2.market.alicloudapi.com/data/send_sms_v2`;
    let appcode = 'f93d0cdcf60041d18aa07ae71d34c924'
    var result = await client.post(url, {
      data: {
        'content': 'code:1234',
        'template_id':"TPL_0000",
        'phone_number':"15268119204"
      },
      headers: {
          Authorization:'APPCODE ' + appcode
      }
    });
    // console.log(JSON.parse(result));
    res(JSON.parse(result))
    })
  
}

module.exports = post