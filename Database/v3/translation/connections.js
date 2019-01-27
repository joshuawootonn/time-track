
const mysql = require('mysql2/promise');

module.exports.oldConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'aacidatabase',
  password: '5656'
})
module.exports.newConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'newdatabase',
  password: '5656'
})