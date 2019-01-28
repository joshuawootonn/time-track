async function main() {
  const mysql = require('mysql2/promise');
  const constants = require('./constants');

  const newConnection = await mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    database: constants.NEW_DATABASE,
    password: constants.PASS
  })
  // CREATE DATABASE
  try{
    await newConnection.execute(`DROP SCHEMA IF EXISTS ${constants.NEW_DATABASE};`)
    await newConnection.execute(`CREATE SCHEMA IF NOT EXISTS ${constants.NEW_DATABASE} DEFAULT CHARACTER SET utf8 ;`)   
    console.log('Database Created');
  }catch(e){
    console.log('Error', e)
  }
  
  // ACL
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACL_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACL_TABLE}(
        \`id\` int(11) NOT NULL AUTO_INCREMENT, 
        \`model\` varchar(512) DEFAULT NULL,
        \`property\` varchar(512) DEFAULT NULL,
        \`accessType\` varchar(512) DEFAULT NULL,
        \`permission\` varchar(512) DEFAULT NULL,
        \`principalType\` varchar(512) DEFAULT NULL,
        \`principalId\` varchar(512) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;`)    
    console.log('ACL Table Created');
  }catch(e){
    console.log('Error', e)
  }

  // AccessToken
  try{    
    await newConnection.execute(`DROP TABLE IF EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACCESS_TOKEN_TABLE};`)
    await newConnection.execute(`CREATE TABLE IF NOT EXISTS ${constants.NEW_DATABASE}.${constants.NEW_ACCESS_TOKEN_TABLE}(
      \`id\` varchar(255) NOT NULL,
      \`ttl\` int(11) DEFAULT NULL,
      \`scopes\` text,
      \`created\` datetime DEFAULT NULL,
      \`userId\` int(11) DEFAULT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;`)    
    console.log('AccessToken Table Created');
  }catch(e){
    console.log('Error', e)
  }
  newConnection.close();
}

main();