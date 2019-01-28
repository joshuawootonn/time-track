const constants = require('./constants');

async function main() {
  const mysql = require('mysql2/promise');
  const newConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'newdatabase',
    password: '5656'
  })
  console.log('Script Starting')
  // Authority
  newConnection.query(
    `   
      INSERT INTO ${constants.NEW_AUTHORITY_TABLE} (id, type) VALUES ?
    `,
    [
      [
        ['1', 'Admin'],
        ['2', 'Employee'],
        ['3', 'Manager'],
      ]
    ]
    ,
    function (err, results, fields) {
      console.log('Authority', err);
    }
  );

  // Crew
  newConnection.query(
    `
      INSERT INTO ${constants.NEW_CREW_TABLE} (id, name) VALUES ?
    `,
    [
      [
        ['1', 'Crew Name'],
      ]
    ]
    ,
    function (err, results, fields) {
      console.log('Crew', err);
    }
  );

  // Category
  newConnection.query(
    `
    INSERT INTO ${constants.NEW_CATEGORY_TABLE} (id, type) VALUES ?
    `,
    [
      [
        ['1', 'Category Name'],
      ]
    ]
    ,
    function (err, results, fields) {
      console.log('Crew', err);
    }
  );


  // Dimension
  newConnection.query(
    `
    INSERT INTO ${constants.NEW_DIMENSION_TABLE} (id, type) VALUES ?
    `,
    [
      [
        ['1', 'Dimension Name'],
      ]
    ]
    ,
    function (err, results, fields) {
      console.log('Crew', err);
    }
  );

  // Subcategory
  newConnection.query(
    `
    INSERT INTO ${constants.NEW_SUBCATEGORY_TABLE} (id, type, category_id, dimension_id) VALUES ?
    `,
    [
      [
        ['1', 'Subcategory Name', '1','1'],
      ]
    ]
    ,
    function (err, results, fields) {
      console.log('Crew', err);
    }
  );  
  console.log('Script Finished')
  setTimeout(() => {newConnection.close()},200);
}
main();
