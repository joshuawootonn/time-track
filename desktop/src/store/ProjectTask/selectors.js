import { createSelector } from 'reselect';

import { getAllTaskObjects } from 'store/Task/selectors';
import { getAllProjectObjects } from 'store/Project/selectors';

export const getProjectTasksFromEntities = state => state.entities.projectTasks;
export const getProjectTasksFromResults = state => state.results.projectTasks;


export const getAllProjectTasks = createSelector(  
  getProjectTasksFromEntities,
  getProjectTasksFromResults,
  getAllTaskObjects,
  getAllProjectObjects,
  (projectTasks, results,tasks,projects) => {
    if (!results || results.size === 0) return null;
    return results.map(projectTaskId => {
      return {
        ...projectTasks[projectTaskId],
        task: tasks[projectTasks[projectTaskId].taskId],
        project: projects[projectTasks[projectTaskId].projectId]
      };
    });
  },
);


export const getAllProjectTasksObjects = createSelector(
  getAllProjectTasks,
  projectTasks => {
    // if the projectTask array is empty
    if (!projectTasks) return null;
    // reduce the projectTask array to a object with id as they key
    return Object.assign({}, ...projectTasks.map(projectTask => ({
      [projectTask.id]: projectTask
    })
    ));    
  },
);
