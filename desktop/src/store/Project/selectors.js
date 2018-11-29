import { createSelector } from 'reselect';

export const getProjectsFromEntities = state => state.entities.projects;
export const getProjectsFromResults = state => state.results.projects;

export const getAllProjects = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (projects, results) => {
    if (!results || results.length === 0) return null;
    return results.map(projectId => {
      return projects[projectId];
    });
  },
);


export const getAllProjectObjects = createSelector(
  getAllProjects,
  projects => {
    // if the task array is empty
    if (!projects) return null;    
    // reduce the task array to a object with id as they key
    return Object.assign({}, ...projects.map(object => ({ [object.id]: object })));
  },
);
