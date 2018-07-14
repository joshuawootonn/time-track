/* This file is just a collection of data to seed to the database */

module.exports.Authority = [
  {
    id: 1,
    type: 'Admin',
  },
  {
    id: 2,
    type: 'Manager',
  },
  {
    id: 3,
    type: 'Employee',
  },
];

module.exports.Category = [
  {
    id: 1,
    type: 'PCC',
  },
  {
    id: 2,
    type: 'Earthwork',
  },
  {
    id: 3,
    type: 'Setup',
  },
];

module.exports.Crew = [
  {
    id: 1,
    name: 'Crew 1',
  },
  {
    id: 2,
    name: 'Crew 2',
  },
  {
    id: 3,
    name: 'Crew 3',
  },
];

module.exports.Dimension = [
  {
    id: 1,
    type: 'LS',
  },
  {
    id: 2,
    type: 'SF',
  },
  {
    id: 3,
    type: 'SY',
  },
];

module.exports.Employee = [
  {
    id: 1,
    firstName: 'Joshua',
    lastName: 'Wootonn',
    pin: '565656',
    isEmployed: '1',
    isWorking: '0',
    authorityId: '1',
    crewId: '1',
  },
  {
    id: 2,
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
    id: 1,
    quantity: '100',
    estimateTime: '1000',
    taskId: '1',
    projectId: '1',
  },
  {
    id: 2,
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
    id: 1,
    name: 'Project 1',
    isActive: '1',
    date: `${date}`,
  },
  {
    id: 2,
    name: 'Project 2',
    isActive: '1',
    date: `${date}`,
  },
  {
    id: 3,
    name: 'Project 3',
    isActive: '0',
    date: `${date}`,
  },
];
module.exports.Subcategory = [
  {
    id: 1,
    type: 'Sidewalk',
    categoryId: '1',
    dimensionId: '1',
  },
  {
    id: 2,
    type: 'Pavement',
    categoryId: '1',
    dimensionId: '1',
  },
];
module.exports.Task = [
  {
    id: 1,
    name: '7" Sidewalk',
    isActive: '1',
    subcategoryId: '1',
  },
  {
    id: 2,
    name: '6" Sidewalk',
    isActive: '1',
    subcategoryId: '1',
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
    id: 1,
    clockInDate: from,
    clockOutDate: to,
    employeeId: '1',
    length: '600',
  },
  {
    id: 2,
    clockInDate: from,
    clockOutDate: to,
    employeeId: '1',
    length: '600',
  },
  {
    id: 3,
    clockInDate: from,
    clockOutDate: to,
    employeeId: '2',
    length: '600',
  },
];

module.exports.Activity = [
  {
    id: 1,
    description: 'This is a description',
    length: '600',
    projectTaskId: 1,
    shiftId: 1,
  },
  {
    id: 2,
    description: 'This is a description 2',
    length: '600',
    projectTaskId: 2,
    shiftId: 2,
  },
  {
    id: 3,
    description: 'This is a description 3',
    length: '600',
    projectTaskId: 1,
    shiftId: 3,
  },
];
