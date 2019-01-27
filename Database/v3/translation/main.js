






async function main() {

  


  const [rows, fields] = await oldConnection.execute('SELECT * FROM `employeelist`');

  rows.forEach(oldEmployee => {
    `INSERT INTO ${NEW_EMPLOYEE} (name, pin, is_employed, is_working, crew_id, authority_id) VALUES (${oldEmployee.name},${oldEmployee.pin},${oldEmployee.current}, ${oldEmployee.active},0, ${oldEmployee.adminStatus ? '1' : '0'})`
  });

  newConnection.close();
  oldConnection.close();

}

main();