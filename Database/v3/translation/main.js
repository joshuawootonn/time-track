
const mysql = require('mysql2');

const oldConnection = mysql.createConnection({
  host: 'localhost',
  user: 'translate_user',
  password: '5656',
  database: 'aacidatabase'
})
const newConnection = mysql.createConnection({
  host: 'localhost',
  user: 'translate_user',
  password: '5656',
  database: 'newdatabase'
})