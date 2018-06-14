'use strict';
var models = require('../models');
var moment = require('moment');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await models.sequelize.sync({ force: true });
    await crew(queryInterface);
    await authority(queryInterface);
    await category(queryInterface);
    await dimension(queryInterface);
    await project(queryInterface);
    await employee(queryInterface);
    await subcategory(queryInterface);
    await shift(queryInterface);
    await task(queryInterface);
    await projectTask(queryInterface);
    await activity(queryInterface);
  },

  down: (queryInterface, Sequelize) => {},
};

function crew(q) {
  return q.bulkInsert(
    'crew',
    [
      { id: '1', name: 'crew 1' },
      { id: '2', name: 'crew 2' },
      { id: '3', name: 'crew 3' },
      { id: '4', name: 'crew 4' },
    ],
    {},
  );
}
function authority(q) {
  return q.bulkInsert(
    'authority',
    [
      { id: '1', type: 'employee' },
      { id: '2', type: 'manager' },
      { id: '3', type: 'admin' },
      { id: '4', type: 'other' },
    ],
    {},
  );
}
function category(q) {
  return q.bulkInsert(
    'category',
    [
      { id: '1', type: 'PCC' },
      { id: '2', type: 'Earth Work' },
      { id: '3', type: 'Utils' },
    ],
    {},
  );
}
function dimension(q) {
  return q.bulkInsert(
    'dimension',
    [
      { id: '1', type: 'sq ft' },
      { id: '2', type: 'sq yd' },
      { id: '3', type: 'cu ft' },
      { id: '4', type: 'cu yd' },
      { id: '5', type: 'ls' },
    ],
    {},
  );
}
function project(q) {
  const now1 = moment(Date.now())
    .month(1)
    .format('YYYY-MM-DD HH:MM:ss');
  const now2 = moment(Date.now())
    .month(2)
    .format('YYYY-MM-DD HH:MM:ss');
  const now3 = moment(Date.now())
    .month(3)
    .format('YYYY-MM-DD HH:MM:ss');
  const now4 = moment(Date.now())
    .month(3)
    .format('YYYY-MM-DD HH:MM:ss');

  return q.bulkInsert(
    'project',
    [
      { id: '1', name: 'Project 1', is_active: '1', date: now1 },
      { id: '2', name: 'Project 2', is_active: '0', date: now2 },
      { id: '3', name: 'Project 3', is_active: '1', date: now3 },
      { id: '4', name: 'Project 4', is_active: '1', date: now4 },
    ],
    {},
  );
}
function employee(q) {
  return q.bulkInsert('employee', [
    {
      id: '1',
      first_name: 'Joshua',
      last_name: 'Wootonn',
      pin: '565656',
      is_employed: '1',
      is_working: '0',
      authority_id: '3',
      crew_id: '1',
    },
    {
      id: '2',
      first_name: 'Jay',
      last_name: 'Simon',
      pin: '121212',
      is_employed: '1',
      is_working: '0',
      authority_id: '3',
      crew_id: '1',
    },
    {
      id: '3',
      first_name: 'Kurt',
      last_name: 'Simon',
      pin: '343434',
      is_employed: '1',
      is_working: '0',
      authority_id: '1',
      crew_id: '2',
    },
    {
      id: '4',
      first_name: 'Jon',
      last_name: 'Doe',
      pin: '878877',
      is_employed: '1',
      is_working: '0',
      authority_id: '2',
      crew_id: '3',
    },
  ]);
}
function subcategory(q) {
  return q.bulkInsert('subcategory', [
    { id: '1', type: 'Curb and Gutter', category_id: '1', dimension_id: '2' },
    { id: '2', type: 'Pavement', category_id: '1', dimension_id: '2' },
    { id: '3', type: 'Sidewalk', category_id: '1', dimension_id: '2' },
    { id: '5', type: 'Mobilization', category_id: '3', dimension_id: '5' },
  ]);
}

function shift(q) {
  let now = moment(Date.now());
  let then = moment(Date.now()).hour(8);

  const length = now.diff(then, 'minutes');

  now = now.format('YYYY-MM-DD HH:MM:ss');
  then = then.format('YYYY-MM-DD HH:MM:ss');

  return q.bulkInsert('shift', [
    {
      id: '1',
      clock_in: then,
      clock_out: now,
      length: length,
      employee_id: '1',
    },
    {
      id: '2',
      clock_in: then,
      clock_out: now,
      length: length,
      employee_id: '2',
    },
    {
      id: '3',
      clock_in: then,
      clock_out: now,
      length: length,
      employee_id: '3',
    },
    {
      id: '4',
      clock_in: then,
      clock_out: now,
      length: length,
      employee_id: '4',
    },
  ]);
}
function task(q) {
  return q.bulkInsert('task', [
    { id: '1', name: '5', numeric: '1', is_active: '1', subcategory_id: '3' },
    { id: '2', name: '6', numeric: '1', is_active: '1', subcategory_id: '3' },
    { id: '3', name: '8', numeric: '1', is_active: '1', subcategory_id: '2' },
    { id: '4', name: '7', numeric: '1', is_active: '1', subcategory_id: '2' },
    { id: '5', name: '8', numeric: '1', is_active: '1', subcategory_id: '2' },
    { id: '6', name: '7', numeric: '1', is_active: '1', subcategory_id: '2' },
    {
      id: '7',
      name: 'Driver',
      numeric: '0',
      is_active: '1',
      subcategory_id: '5',
    },
    {
      id: '8',
      name: 'Passenger',
      numeric: '0',
      is_active: '1',
      subcategory_id: '5',
    },
  ]);
}

function projectTask(q) {
  return q.bulkInsert('project_task', [
    {
      id: '1',
      task_id: '1',
      project_id: '1',
      quantity: '1000',
      estimate_time: '1000',
    },
    {
      id: '2',
      task_id: '2',
      project_id: '1',
      quantity: '2000',
      estimate_time: '5000',
    },
    {
      id: '3',
      task_id: '2',
      project_id: '2',
      quantity: '4400',
      estimate_time: '400',
    },
    {
      id: '4',
      task_id: '4',
      project_id: '3',
      quantity: '500',
      estimate_time: '2000',
    },
    {
      id: '5',
      task_id: '5',
      project_id: '3',
      quantity: '800',
      estimate_time: '2000',
    },
    {
      id: '6',
      task_id: '6',
      project_id: '3',
      quantity: '600',
      estimate_time: '200',
    },
    {
      id: '7',
      task_id: '7',
      project_id: '4',
      quantity: '1',
      estimate_time: '500',
    },
    {
      id: '8',
      task_id: '7',
      project_id: '4',
      quantity: '1',
      estimate_time: '100',
    },
  ]);
}

function activity(q) {
  return q.bulkInsert('activity', [
    { id: '1', length: '120', shift_id: '1', project_task_id: '1' },
    { id: '2', length: '660', shift_id: '1', project_task_id: '2' },
    { id: '3', length: '320', shift_id: '2', project_task_id: '3' },
    { id: '4', length: '460', shift_id: '2', project_task_id: '4' },
    { id: '5', length: '280', shift_id: '3', project_task_id: '5' },
    { id: '6', length: '500', shift_id: '3', project_task_id: '6' },
    { id: '7', length: '780', shift_id: '4', project_task_id: '8' },
  ]);
}
