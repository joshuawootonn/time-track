import { createSelector } from 'reselect';
import {
  getProjectsFromEntities,
  getProjectsFromResults,
} from 'store/Project/selectors';

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
