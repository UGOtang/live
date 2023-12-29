const redis = require('redis');

const client = redis.createClient({
    host:'110.40.204.35'
});

client.on("error",err => {  
    console.error(err)
})

module.exports = client;