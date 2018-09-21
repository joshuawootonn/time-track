import { createSelector } from 'reselect';

export const getTasksFromEntities = state => state.entities.tasks;
export const getTasksFromResults = state => state.results.tasks;

export const getAllTasks = createSelector(
  getTasksFromEntities,
  getTasksFromResults,
  (tasks, results) => {
    if (!results || results.size === 0) return null;
    return results.map(taskId => {
      return tasks[taskId];
    });
  },
);

export const getAllTaskObjects = createSelector(
  getAllTasks,
  (tasks) => {
    // if the task array is empty
    if (!tasks) return null;    
    // reduce the task array to a object with id as they key
    return Object.assign({}, ...tasks.map(object => ({[object.id]: object})))
    
  },
);
