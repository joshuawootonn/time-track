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
