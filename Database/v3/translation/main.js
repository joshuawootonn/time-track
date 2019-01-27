



const constants = require('./constants')
const moment = require('moment');

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

  // Employees
  const [employeeRows] = await oldConnection.execute(`SELECT * FROM ${constants.OLD_EMPLOYEE_TABLE}`);

  employeeRows.forEach(async oldEmployee => {
    let name;
    if (oldEmployee.name.split(',').length === 2) {
      name = oldEmployee.name.split(',')
    } else if (oldEmployee.name.split(' ').length === 2) {
      name = oldEmployee.name.split(' ')
    } else {
      name = [oldEmployee.name, '']
    }
    let first_name = name[1].trim()
    let last_name = name[0].trim()
    //console.log(oldEmployee.adminstatus, oldEmployee.adminstatus === 1);
    await newConnection.execute(`INSERT INTO ${constants.NEW_EMPLOYEE_TABLE} (id, first_name, last_name, pin, is_employed, is_working, crew_id, authority_id) 
    VALUES (${oldEmployee.id},'${first_name}', '${last_name}', '${oldEmployee.pin}', '${oldEmployee.current}', '${oldEmployee.active}', '1', '${oldEmployee.adminstatus === 1 ? '1' : '2'}')`)

  });
  console.log('Employee migration complete')


  // Tasks
  const [taskRows] = await oldConnection.execute(`SELECT * FROM ${constants.OLD_ITEM_TABLE}`);

  taskRows.forEach(async oldTask => {
    await newConnection.execute(`INSERT INTO ${constants.NEW_TASK_TABLE} (id, name, is_active, subcategory_id) 
    VALUES (${oldTask.id},'${oldTask.name}', '1', '1')`)

  });
  console.log('Item/Task migration complete')

  // Projects
  const [projectRows] = await oldConnection.execute(`SELECT * FROM ${constants.OLD_PROJECT_TABLE}`);
  let currentId = 1;
  for await (const oldProject of projectRows) {
    const currentMoment = moment(oldProject.date);
    const currentTime = currentMoment.format('YYYY-MM-DD HH:MM:SS');
    await newConnection.execute(`INSERT INTO ${constants.NEW_PROJECT_TABLE} (id, name, is_active, date) 
    VALUES (${oldProject.id},'${oldProject.name}', '${oldProject.current}', '${currentTime}')`)

    // Project Tasks
    const [projectTaskRows] = await oldConnection.execute(`SELECT * FROM project${oldProject.id}`)
    
    for await (const oldProjectTask of projectTaskRows) {      
      newConnection.execute(`INSERT INTO ${constants.NEW_PROJECT_TASK_TABLE} (id, quantity, estimate_time, project_id, task_id) 
      VALUES (${currentId},'${oldProjectTask.quantity}', '${oldProjectTask.ehours || 0}', '${oldProject.id}', '${oldProjectTask.itemid}')`)
      currentId++;
    };
    
  };
  console.log('Project migration complete')





  // newConnection.close();
  // oldConnection.close();

}

main();

