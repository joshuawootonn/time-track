/***************************
This script was never used but it just updates the database where the tables do not exist
***************************/

var server = require('../server');
var ds = server.dataSources.db;

const models = ['authority'];

ds.isActual(models, function(err, actual) {
  if (!actual) {
    ds.autoupdate(models, function(err, result) {
      ds.disconnect();
    });
  }
  ds.disconnect();
});


