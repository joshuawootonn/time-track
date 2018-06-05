var Sequelize = require('sequelize');
require('dotenv').config()
var connection = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

connection.sync();