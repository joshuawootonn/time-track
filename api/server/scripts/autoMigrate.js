/***************************
 * This script was never used but it just hard migrates the database from loopback models
 *   
 * Change:
 */
process.env.NODE_ENV = 'local';
/*  */ 

var app = require('../server');
var ds = app.dataSources.db;

const credentialModels = ['Users','Roles','RoleMapping','ACL','AccessToken'];
const entityModels = [];

for (var asdf in app.models){
  if(!credentialModels.includes(asdf))
  {entityModels.push(asdf);
    console.log(asdf);
  }
    
}
console.log(entityModels)

ds.automigrate(entityModels, function(err, result) {
  ds.disconnect();
});
