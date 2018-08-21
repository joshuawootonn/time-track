import { createSelector } from 'reselect';

export const getProjectsFromEntities = state => state.entities.projects;
export const getProjectsFromResults = state => state.results.projects;

export const getAllProjects = createSelector(
  getProjectsFromEntities,getProjectsFromResults,
  (projects,results) => {
    if (!results || results.size === 0) return null;
    return results.map(projectId => {
      return projects[projectId];
    }); 
  }
)


