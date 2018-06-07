const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config();



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


const connection = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const seq = connection.sync();

const routes = require('./routes/authority.route')(router);
require('./routes/crew.route')(router);
require('./routes/employee.route')(router)
app.use('/api',router);
app.get('/', (req, res) => res.send('Hello World!'));


module.exports = app;



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
