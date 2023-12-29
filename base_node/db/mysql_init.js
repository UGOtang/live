const mysql = require('mysql')

let db = mysql.createPool({host:"110.40.204.35",user:"root",password:'123456',port:13307,database:"live"})

module.exports = db