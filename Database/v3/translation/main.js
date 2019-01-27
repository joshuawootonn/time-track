



const constants = require('./constants')


async function main() {


  const mysql = require('mysql2/promise');

  const oldConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'aacidatabase',
    password: '5656'
  })
  const newConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'newdatabase',
    password: '5656'
  })


  const [rows, fields] = await oldConnection.execute(`SELECT * FROM ${constants.OLD_EMPLOYEE_TABLE}`);

  rows.forEach( async (oldEmployee,i) => {
    let name;    
    if (oldEmployee.name.split(',').length === 2){
      name = oldEmployee.name.split(',')
    }else if (oldEmployee.name.split(' ').length === 2){
      name = oldEmployee.name.split(' ')
    }else {
      name = [oldEmployee.name, '']
    }
    let first_name = name[1].trim()
    let last_name = name[0].trim()
    //console.log(oldEmployee.adminstatus, oldEmployee.adminstatus === 1);
    await newConnection.execute(`INSERT INTO ${constants.NEW_EMPLOYEE_TABLE} (id, first_name, last_name, pin, is_employed, is_working, crew_id, authority_id) 
    VALUES (${i+1},'${first_name}', '${last_name}', '${oldEmployee.pin}', '${oldEmployee.current}', '${oldEmployee.active}', '1', '${oldEmployee.adminstatus === 1 ? '1' : '2'}')`)
    
  });
  console.log('Employee migration complete')


  
  // newConnection.close();
  // oldConnection.close();

}

main();

