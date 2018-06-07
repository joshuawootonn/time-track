var SequelizeAuto = require('sequelize-auto');
require('dotenv').config();

var auto = new SequelizeAuto(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    output: '../',
  },
);

auto.run(function(err) {
  if (err) throw err;
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
