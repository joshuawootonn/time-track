process.env.NODE_ENV="cloud"

console.log(process.env.NODE_ENV);
require('dotenv').config()
var server = require('../server');

var ds = server.dataSources.db;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log(
    'Loopback tables [' - lbTables - '] created in ',
    ds.adapter.name,
  );
  ds.disconnect();
});
