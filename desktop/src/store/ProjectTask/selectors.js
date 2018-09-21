import { createSelector } from 'reselect';

import {getAllTaskObjects} from 'store/Task/selectors'
import {getAllProjectObjects} from 'store/Project/selectors';


export const getProjectTasksFromEntities = state => state.entities.projectTasks;
export const getProjectTasksFromResults = state => state.results.projectTasks;


export const getAllProjectTasks = createSelector(
  getProjectTasksFromEntities,
  getProjectTasksFromResults,
  (projectTasks, results) => {
    if (!results || results.size === 0) return null;
    return results.map(projectTaskId => {
      return projectTasks[projectTaskId];
    });
  },
);


export const getAllProjectTasksObjects = createSelector(
  getAllProjectTasks,
  getAllProjectObjects,
  getAllTaskObjects,
  (projectTasks,projects,tasks) => {
    // if the projectTask array is empty
    if (!projectTasks) return null;    
    // reduce the projectTask array to a object with id as they key
    return projectTasks.reduce((obj,projectTask) => {
      obj[projectTask.id] = projectTask;
      return obj
    });
  },
);
