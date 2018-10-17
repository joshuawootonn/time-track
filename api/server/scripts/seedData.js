/* This file is just a collection of data to seed to the database */

module.exports.Authority = [
  {
    type: 'admin',
  },
  {
    type: 'manager',
  },
  {
    type: 'employee',
  },
];

module.exports.Category = [
  {
    type: 'PCC',
  },
  {
    type: 'Earthwork',
  },
  {
    type: 'Setup',
  },
];

module.exports.Crew = [
  {
    name: 'Crew 1',
  },
  {
    name: 'Crew 2',
  },
  {
    name: 'Crew 3',
  },
];

module.exports.Dimension = [
  {
    type: 'LS',
  },
  {
    type: 'SF',
  },
  {
    type: 'SY',
  },
];

module.exports.Employee = [
  {
    firstName: 'Joshua',
    lastName: 'Wootonn',
    pin: '565656',
    isEmployed: '1',
    isWorking: '0',
    authorityId: '3',
    crewId: '1',
  },
  {
    firstName: 'Jay',
    lastName: 'Simon',
    pin: '234234',
    isEmployed: '1',
    isWorking: '0',
    authorityId: '1',
    crewId: '1',
  },
];
module.exports.ProjectTask = [
  {
    quantity: '100',
    estimateTime: '1000',
    taskId: '1',
    projectId: '1',
  },
  {
    quantity: '200',
    estimateTime: '500',
    taskId: '1',
    projectId: '1',
  },
];
const date = new Date()
  .toISOString()
  .slice(0, 19)
  .replace('T', ' ');
module.exports.Project = [
  {
    name: 'Project 1',
    isActive: '1',
    date: `${date}`,
  },
  {
    name: 'Project 2',
    isActive: '1',
    date: `${date}`,
  },
  {
    name: 'Project 3',
    isActive: '0',
    date: `${date}`,
  },
];
module.exports.Subcategory = [
  {
    type: 'Sidewalk',
    categoryId: '1',
  },
  {
    type: 'Pavement',
    categoryId: '1',
  },
];
module.exports.Task = [
  {
    name: '7" Sidewalk',
    isActive: '1',
    subcategoryId: '1',
    dimensionId: '1',
  },
  {
    name: '6" Sidewalk',
    isActive: '1',
    subcategoryId: '1',
    dimensionId: '1',
  },
];

let to = new Date();
to.setHours(18);
to = to
  .toISOString()
  .slice(0, 19)
  .replace('T', ' ');
let from = new Date();
from.setHours(18);
from = from
  .toISOString()
  .slice(0, 19)
  .replace('T', ' ');

module.exports.Shift = [
  {
    clockInDate: from,
    clockOutDate: to,
    employeeId: '1',
    length: '600',
  },
  {
    clockInDate: from,
    clockOutDate: to,
    employeeId: '1',
    length: '600',
  },
  {
    clockInDate: from,
    clockOutDate: to,
    employeeId: '2',
    length: '600',
  },
];

module.exports.Activity = [
  {
    description: 'This is a description',
    length: '600',
    projectTaskId: 1,
    shiftId: 1,
  },
  {
    description: 'This is a description 2',
    length: '600',
    projectTaskId: 2,
    shiftId: 2,
  },
  {
    description: 'This is a description 3',
    length: '600',
    projectTaskId: 1,
    shiftId: 3,
  },
];
