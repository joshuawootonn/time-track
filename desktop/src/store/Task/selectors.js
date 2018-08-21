import { createSelector } from 'reselect';

export const getTasksFromEntities = state => state.entities.tasks;
export const getTasksFromResults = state => state.results.tasks;

export const getAllTasks = createSelector(
  getTasksFromEntities,getTasksFromResults,
  (tasks,results) => {
    if (!results || results.size === 0) return null;
    return results.map(taskId => {
      return tasks[taskId];
    }); 
  }
)


