
import moment from 'moment';

export const EMPLOYEE_MOCK = [{
  id: 0,
  firstName: `Joshua`,
  lastName: `Wootonn`
}, {
  id: 1,
  firstName: `1`,
  lastName: `1`
}, {
  id: 2,
  firstName: `2`,
  lastName: `2`
}];

export const PROJECT_MOCK = [{
  id: 0,
  name: `0`,
  isActive: 0,
  date: `2017-02-13T00:02:00.000Z`
}, {
  id: 1,
  name: `1`,
  isActive: 0,
  date: `2017-02-13T00:02:00.000Z`
}, {
  id: 2,
  name: `2`,
  isActive: 0,
  date: `2017-02-13T00:02:00.000Z`
}];

export const PROJECT_TASK_MOCK = [{
  id: 0,
  estimateTime: 758,
  projectId: 0,
  quantity: 1500,
  taskId: 0,
  task: {
    id: 0,
    isActive: 0,
    name: `0`,
    category: { id: 0, name: `name0` },
    subcategory: { id: 0, name: `name0` }
  }
},
{
  id: 1,
  estimateTime: 758,
  projectId: 1,
  quantity: 1500,
  taskId: 1,
  task: {
    id: 1,
    isActive: 1,
    name: `1`,
    category: { id: 1, name: `name1` },
    subcategory: { id: 1, name: `name1` }
  }
},
{
  id: 2,
  estimateTime: 758,
  projectId: 2,
  quantity: 1500,
  taskId: 2,
  task: {
    id: 2,
    isActive: 2,
    name: `2`,
    category: { id: 2, name: `name2` },
    subcategory: { id: 2, name: `name2` }
  }
}];

export const PROJECT_TASK_OBJECT_MOCK = {
  0: {
    id: 0,
    estimateTime: 758,
    projectId: 0,
    quantity: 1500,
    taskId: 0,
    task: {
      id: 0,
      isActive: 0,
      name: `0`,
      category: { id: 0, name: `name0` },
      subcategory: { id: 0, name: `name0` }
    }
  },
  1: {
    id: 1,
    estimateTime: 758,
    projectId: 1,
    quantity: 1500,
    taskId: 1,
    task: {
      id: 1,
      isActive: 1,
      name: `1`,
      category: { id: 1, name: `name1` },
      subcategory: { id: 1, name: `name1` }
    }
  },
  2: {
    id: 2,
    estimateTime: 758,
    projectId: 2,
    quantity: 1500,
    taskId: 2,
    task: {
      id: 2,
      isActive: 2,
      name: `2`,
      category: { id: 2, name: `name2` },
      subcategory: { id: 2, name: `name2` }
    }
  }
};

export const ACTIVITY_MOCK = [{
  description: ``,
  id: 1,
  length: 225,
  projectTaskId: 1,
  shiftId: 1,
  projectTask: {
    estimateTime: 758,
    id: 1,
    projectId: 1,
    quantity: 1500,
    taskId: 1,
    task: {
      id: 1,
      isActive: 1,
      name: `6" Driveway`,
      subcategoryId: 1,
      subcategory: {
        categoryId: 1,
        id: 1,
        type: `Subcategory Name`,
        dimensionId: 1
      },
      category: {
        id: 1,
        type: `Category Name`
      },
      dimension: {
        id: 1,
        type: `Dimension Name`
      }
    },
    project: {
      date: `2017-02-13T00:02:00.000Z`,
      id: 1,
      isActive: 0,
      name: `1722: Musc. Co. Fruitland Whitetopping`
    }
  },
  projectId: 1
}];

export const INCOMPLETE_SHIFT_MOCK = [{
  clockInDate:`2018-11-25T15:00:00.000Z`,
  clockOutDate:null,
  employeeId:2,
  id:9,
  length:null,
  lunch:null,
  activities:[],
  employee:{ 
    authorityId:1,
    crewId:1,
    firstName:`Joshua`,
    id:2,
    isEmployed:1,
    isWorking:1,
    lastName:`Wootonn`,
    pin:565656 } 
}];


export const COMPLETE_SHIFT_MOCK = [{
  clockInDate:moment().startOf(`week`).add(1,`day`).add(7,`hours`).toString(),
  clockOutDate:moment().startOf(`week`).add(1,`day`).add(15,`hours`).toString(),
  employeeId:2,
  id:10,
  length:480,
  lunch:null,
  activities:[{
    description: ``,
    id: 1,
    length: 240,
    projectTaskId: 1,
    shiftId: 1,
    projectId: 1
  },
  {
    description: ``,
    id: 2,
    length: 240,
    projectTaskId: 1,
    shiftId: 1,
    projectId: 1
  }],
  employee:{ 
    authorityId:1,
    crewId:1,
    firstName:`Joshua`,
    id:2,
    isEmployed:1,
    isWorking:1,
    lastName:`Wootonn`,
    pin:565656 } 
},{
  clockInDate:moment().startOf(`week`).add(2,`day`).add(7,`hours`).toString(),
  clockOutDate:moment().startOf(`week`).add(2,`day`).add(15,`hours`).toString(),
  employeeId:3,
  id:10,
  length:480,
  lunch:null,
  activities:[{
    description: ``,
    id: 3,
    length: 225,
    projectTaskId: 1,
    shiftId: 1,
    projectId: 1
  },
  {
    description: ``,
    id: 4,
    length: 240,
    projectTaskId: 1,
    shiftId: 1,
    projectId: 1
  }],
  employee:{ 
    authorityId:1,
    crewId:1,
    firstName:`Richard`,
    id:4,
    isEmployed:1,
    isWorking:1,
    lastName:`Wootonn`,
    pin:565656 
  } 
}];

export const CREW_MOCK = [
  {
    name: `Crew 1`,
    id: 1
  },{
    name: `Crew 2`,
    id: 2
  },{
    name: `Crew 3`,
    id: 3
  }
];

export const AUTHORITY_MOCK = [
  {
    type: `Admin`,
    id: 1
  },{
    type: `Employee`,
    id: 2
  },{
    type: `Manager`,
    id: 3
  }
];