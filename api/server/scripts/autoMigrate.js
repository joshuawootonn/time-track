/***************************
This script was never used but it just hard migrates the database from loopback models
***************************/
var server = require('../server');
var ds = server.dataSources.db;
const models = ['authority'];

ds.automigrate(models, function(err, result) {
  ds.disconnect();
});
