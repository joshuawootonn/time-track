import { createSelector } from 'reselect';

export const getProjectsFromEntities = state => state.entities.employee;
export const getProjectsFromResults = state => state.results.employee;

export const getCurrentEmployee = createSelector(
  getProjectsFromResults,
  getProjectsFromEntities,
  (results, projects) => {
    if (!results || results.size === 0) return null;
    return results.map(projectId => {
      return projects[projectId];
    });
  },
);
