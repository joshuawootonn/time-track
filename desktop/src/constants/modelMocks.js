
export const EMPLOYEE_MOCK = [{
  id: 0,
  firstName: '0',
  lastName: '0'
}, {
  id: 1,
  firstName: '1',
  lastName: '1'
}, {
  id: 2,
  firstName: '2',
  lastName: '2'
}]

export const PROJECT_MOCK = [{
  id: 0,
  name: '0',
  isActive: 0,
  date: "2017-02-13T00:02:00.000Z"
}, {
  id: 1,
  name: '1',
  isActive: 0,
  date: "2017-02-13T00:02:00.000Z"
}, {
  id: 2,
  name: '2',
  isActive: 0,
  date: "2017-02-13T00:02:00.000Z"
}]

export const PROJECT_TASK_MOCK = [{
  id: 0,
  estimateTime: 758,
  projectId: 0,
  quantity: 1500,
  taskId: 0,
  task: {
    id: 0,
    isActive: 0,
    name: "0",
    category: { id: 0, name: 'name0' },
    subcategory: { id: 0, name: 'name0' }
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
    name: "1",
    category: { id: 1, name: 'name1' },
    subcategory: { id: 1, name: 'name1' }
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
    name: "2",
    category: { id: 2, name: 'name2' },
    subcategory: { id: 2, name: 'name2' }
  }
}]