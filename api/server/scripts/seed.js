process.env.NODE_ENV = 'local';
const app = require('../server');
const chalk = require('chalk')
const log = console.log;
const models = app.models;


const data = require('./seedData');

const seed = () => {


  models.Authority.destroyAll((err,info)=>{
    

    models.Authority.create(data.authority, function (err, records) {
      if (err) { return log(chalk.bgRed(err)); }
      log(chalk.bgGreen('Done seeding Authority, ' + records.length + ' records created.'));
    });
  });
  
  
  models.Crew.destroyAll((err,info)=>{
    

    models.Crew.create(data.crew, function (err, records) {
      if (err) { return log(chalk.bgRed(err)); }
      log(chalk.bgGreen('Done seeding Crew, ' + records.length + ' records created.'));
    });
  });
  

  // await models.Category.destroyAll(err => { });
  // await models.Category.create(data.category, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err.message)); }
  //   log(chalk.bgGreen('Done seeding Category, ' + records.length + ' records created.'));
  // });

  // await models.Dimension.destroyAll(err => { });
  // await models.Dimension.create(data.dimension, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err.message)); }
  //   log(chalk.bgGreen('Done seeding Dimension, ' + records.length + ' records created.'));
  // });

  // await models.Project.destroyAll(err => { });
  // await models.Project.create(data.project, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err.message)); }
  //   log(chalk.bgGreen('Done seeding Project, ' + records.length + ' records created.'));
  // });



  // await models.Employee.destroyAll(null, (err,info)=>{
  //   console.log(err,info);
  // });
  // await models.Employee.create(data.employee, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err.message)); }
  //   log(chalk.bgGreen('Done seeding Employee, ' + records.length + ' records created.'));
  // });

  // await models.Subcategory.destroyAll(err => { });
  // await models.Subcategory.create(data.subCategory, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err.message)); }
  //   log(chalk.bgGreen('Done seeding SubCategory, ' + records.length + ' records created.'));
  // });




  // await models.Task.destroyAll(err => { });
  // await models.Task.create(data.task, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err)); }
  //   log(chalk.bgGreen('Done seeding Task, ' + records.length + ' records created.'));
  // });


  // await models.Shift.destroyAll(err => { });
  // await models.Shift.create(data.shift, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err)); }
  //   log(chalk.bgGreen('Done seeding Task, ' + records.length + ' records created.'));
  // });

  // // shift




  // await models.ProjectTask.destroyAll(err => { });
  // await models.ProjectTask.create(data.project_task, function (err, records) {
  //   if (err) { return log(chalk.bgRed(err.message)); }
  //   log(chalk.bgGreen('Done seeding ProjectTask, ' + records.length + ' records created.'));
  // });


  // //activity

  

  
  
}




seed();