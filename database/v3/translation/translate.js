const constants = require('./constants')
const moment = require('moment');

async function main() {


  const mysql = require('mysql2/promise');

  const oldConnection = await mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    database: constants.OLD_DATABASE,
    password: constants.PASS
  })
  const newConnection = await mysql.createConnection({
    host: constants.HOST,
    user: constants.USER,
    database: constants.NEW_DATABASE,
    password: constants.PASS
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
    
    const currentMoment = moment(oldProject.date,'MM/DD/YYYY');
    const currentTime = currentMoment.format('YYYY-MM-DD HH:MM:SS');
    await newConnection.execute(`INSERT INTO ${constants.NEW_PROJECT_TABLE} (id, name, is_active, date) 
    VALUES (${oldProject.id},'${oldProject.name}', '${oldProject.current}', '${currentTime}')`)

    // Project Tasks
    const [projectTaskRows] = await oldConnection.execute(`SELECT * FROM project${oldProject.id}`)
    
    for await (const oldProjectTask of projectTaskRows) {      
      await newConnection.execute(`INSERT INTO ${constants.NEW_PROJECT_TASK_TABLE} (id, quantity, estimate_time, project_id, task_id) 
      VALUES (${currentId},'${oldProjectTask.quantity}', '${oldProjectTask.ehours || 0}', '${oldProject.id}', '${oldProjectTask.itemid}')`)
      currentId++;
    };
    
  };
  console.log('Project migration complete')


  const [shiftRows] = await oldConnection.execute(`SELECT * FROM ${constants.OLD_SHIFT_TABLE}`)
  const hashOfUsedShiftIds = {};

  for await ( const oldShift of shiftRows){    
    if(hashOfUsedShiftIds[oldShift.shiftid] !== 1){ 
      const round = (length) => Math.round(length/15) * 15;

      const inTimeString = oldShift.timein.split(':')
      const inDatetimeMoment = moment(oldShift.datein).add(parseInt(inTimeString[0]),'hours').add(parseInt(inTimeString[1]),'minutes');

      const outTimeString = oldShift.timeout.split(':')
      const outDatetimeMoment = moment(oldShift.datein).add(parseInt(outTimeString[0]),'hours').add(parseInt(outTimeString[1]),'minutes');

      const inDatetime = inDatetimeMoment.format("YYYY-MM-DD HH:mm:ss");
      const outDatetime = outDatetimeMoment.format("YYYY-MM-DD HH:mm:ss");     

      // console.log(oldShift.timein, ' --- ',parseInt(inTimeString[0]), ' --- ',parseInt(inTimeString[1]),' --- ', inDatetime)
      // console.log(oldShift.timeout, ' --- ',parseInt(outTimeString[0]), ' --- ',parseInt(outTimeString[1]), ' --- ', outDatetime);
      //const length = oldShift.time.split(':')[0] * 60 + oldShift.time.split(':')[1]
      const length = outDatetimeMoment.diff(inDatetimeMoment, 'minutes');
      const lunch = oldShift.timelunch.split(':')[0] * 60 + oldShift.timelunch.split(':')[1]
      
      //console.log(oldShift.shiftid, inDatetime, outDatetime,length, lunch, oldShift.employeeid)
    
      const [employeeRows] = await newConnection.execute(`SELECT * FROM ${constants.NEW_EMPLOYEE_TABLE} WHERE id='${oldShift.employeeid}'`)
      if(employeeRows && employeeRows.length > 0){
        await newConnection.execute(`INSERT INTO ${constants.NEW_SHIFT_TABLE} (id,clock_in_date, clock_out_date,length,lunch, employee_id) 
        VALUES (${oldShift.shiftid}, '${inDatetime}', '${outDatetime}', ${length}, ${lunch}, ${oldShift.employeeid} )`)
        hashOfUsedShiftIds[oldShift.shiftid] = 1;
      }else{
        console.log(`Shift with id: ${oldShift.id} was not inserted on line: ${103} due to not being a valid employee`)
      }
    }   
  }
  console.log('Shift migration complete')



  for await( const oldShift of shiftRows) {
    const timeOfActivity = oldShift.time.split(':').length > 1 ? parseInt(oldShift.time.split(':')[0]) * 60 + parseInt(oldShift.time.split(':')[1]) : '0';
    //console.log(timeOfActivity,oldShift.time,parseInt(oldShift.time.split(':')[0]),parseInt(oldShift.time.split(':')[1]) )
    
    const [projectTaskRows] = await newConnection.execute(`SELECT * FROM ${constants.NEW_PROJECT_TASK_TABLE} WHERE task_id='${oldShift.itemid}' AND project_id='${oldShift.projectid}'`)
    const [projectTaskRows2] = await newConnection.execute(`SELECT * FROM ${constants.NEW_PROJECT_TASK_TABLE} WHERE task_id='40' AND project_id='${oldShift.projectid}'`)
    
    const [shiftRows2] = await newConnection.execute(`SELECT * FROM ${constants.NEW_SHIFT_TABLE} WHERE id='${oldShift.shiftid}'`)


    if(projectTaskRows.length > 0 && shiftRows2.length > 0)
    {
      await newConnection.execute(`INSERT INTO ${constants.NEW_ACTIVITY_TABLE} (id, length, description, shift_id, project_task_id) 
      VALUES (${oldShift.id}, '${timeOfActivity}', '${oldShift.description || ''}', ${oldShift.shiftid}, ${projectTaskRows[0].id} )`)
    } else if (projectTaskRows.length > 0)
    {
      console.log(`Activity with id: ${oldShift.id} and shiftid: ${oldShift.shiftid} was not inserted because the shift was never created`)
    } else if (projectTaskRows2.length > 0 && shiftRows2.length > 0)
    {
      await newConnection.execute(`INSERT INTO ${constants.NEW_ACTIVITY_TABLE} (id, length, description, shift_id, project_task_id) 
      VALUES (${oldShift.id}, '${timeOfActivity}', '${oldShift.description  || ''}', ${oldShift.shiftid}, ${projectTaskRows2[0].id} )`)
    } else 
    {
      console.log(`Activity with id: ${oldShift.id} and shiftid: ${oldShift.shiftid} was not inserted on line ${114} due to there not being a valid project task with task_id: ${oldShift.itemid} and project_id: ${oldShift.projectid}`)
    }
  } 
  console.log('Activity migration complete')


  newConnection.close();
  oldConnection.close();

}

main();

