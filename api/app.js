var Sequelize = require('sequelize');
require('dotenv').config()

// var connection = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,process.env.DB_PASS,{
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT
// });
// var Article = connection.define('article',{
//   title: Sequelize.STRING,
//   body: Sequelize.TEXT
// })

// connection.sync();










// const mysql = require('mysql2');
 
// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '5656',
//   database: 'test', 
//   insecureAuth : true
// });
// connection.connect((err) => {
//   if(err){
//     console.log("run this with the user you want to use'ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';'")
//     throw err;
//   } 
//   console.log('mysql connected')
// })



var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS);

auto.run(function (err) {
  if (err) throw err;
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});


// var SequelizeAuto = require('sequelize-auto')
// var auto = new SequelizeAuto('timetrack', 'root', '5656');

// auto.run(function (err) {
//   if (err) throw err;

//   console.log(auto.tables); // table list
//   console.log(auto.foreignKeys); // foreign key list
// });