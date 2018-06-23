/***************************
This is a programmatic way of running 'drop_and_create_credential_tables.sql'

1. Make sure that the correct mysql stuff is in a .env file in the root dir
2. Make sure you set the NODE_ENV variable to the correct enviroment
3. Make sure that datasource.{NODE_ENV}.js is configured to take the env variables

***************************/


process.env.NODE_ENV="local"

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
