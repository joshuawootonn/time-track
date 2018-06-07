
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
require('dotenv').config();
var db        = {};

const sequelize = new Sequelize(process.env.DB_SCHEMA,process.env.DB_USER,process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
