/**********************************
 * Delete and Reseeds
 *   
 * Change:NODE_ENV
 */
process.env.NODE_ENV = "test"

const app = require('../server');
const chalk = require('chalk')
const log = console.log;
const models = app.models;
const async = require('async');
const ds = app.dataSource.db;
const data = require('./seedData');

const deleteThem = (ele, cb) => {
  models[ele].destroyAll((err) => {
    if (err) { return log(chalk.bgRed(ele + " : " + err)) }
    else { log(chalk.white("Deleted " + ele)); }
    cb();
  })
}
const createThem = (ele, cb) => {
  models[ele].create(data[ele], (err, records) => {
    if (err) { return log(chalk.bgRed(ele + " : " + err)) }
    else { log(chalk.white("Created " + ele)); }
    cb();
  })
}

const modelNames = ['Activity', 'ProjectTask', 'Shift', 'Task', 'Employee', 'Subcategory',
  'Crew', 'Authority', 'Project', 'Category', 'Dimension']
const modelNamesReverse = modelNames.reverse();


async.eachSeries(modelNames, deleteThem, (err) => {
  if (err) {
    log(err); 
    ds.disconnect();
  }
  else {
    log(chalk.bgGreen("Deleted All"));

    async.eachSeries(modelNamesReverse, createThem, (err) => {
      if (err) {
        log(err); 
        ds.disconnect();
      }
      else {
        log(chalk.bgGreen("Created All"));
        ds.disconnect();
      }
    })
  }
})  