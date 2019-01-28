async function main() {
  const mysql = require('mysql2/promise');
  const constants = require('./constants');

  const newConnection = await mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    database: constants.NEW_DATABASE,
    password: constants.PASS
  })
  try{
    await newConnection.execute(`SET FOREIGN_KEY_CHECKS = 0;`)
    await newConnection.execute(`TRUNCATE TABLE ${constants.NEW_DATABASE}.${constants.NEW_EMPLOYEE_TABLE};`)
    await newConnection.execute(`TRUNCATE TABLE ${constants.NEW_DATABASE}.${constants.NEW_PROJECT_TASK_TABLE};`)
    await newConnection.execute(`TRUNCATE TABLE ${constants.NEW_DATABASE}.${constants.NEW_TASK_TABLE};`)
    await newConnection.execute(`TRUNCATE TABLE ${constants.NEW_DATABASE}.${constants.NEW_PROJECT_TABLE};`)
    await newConnection.execute(`TRUNCATE TABLE ${constants.NEW_DATABASE}.${constants.NEW_SHIFT_TABLE};`)
    await newConnection.execute(`TRUNCATE TABLE ${constants.NEW_DATABASE}.${constants.NEW_ACTIVITY_TABLE};`)
    await newConnection.execute(`SET FOREIGN_KEY_CHECKS = 1; `)  
    console.log('Database cleaned');
  }catch(e){
    console.log('Error', e)
  }
  newConnection.close();
}

main();