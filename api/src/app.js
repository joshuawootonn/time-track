const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// var connection = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,process.env.DB_PASS,{
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT
// });
// var Article = connection.define('article',{
//   title: Sequelize.STRING,
//   body: Sequelize.TEXT
// })

// connection.sync();


require('./routes/employee')(router,"db");
app.use('/api',router);
app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));



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
