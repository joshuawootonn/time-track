import { createSelector } from 'reselect';
import moment from 'moment';

export const getProjectsFromEntities = state => state.entities.projects;
export const getProjectsFromResults = state => state.results.projects;

// ICEBOX: Test and migrate Project selectors
export const getAllProjectsNew = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (_, props) => (props ? props.sorts : null),
  (_, props) => (props ? props.filters : null),
  (projects, results, sorts, filters) => {
    if (!results || results.length === 0) return null;
    let list = results.map(projectId => {
      return projects[projectId];
    });

    // SORT
    if (sorts) {
      list = list.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    }

    if (filters) {
      list = list.filter(project => {
        let decision = true;
        Object.keys(filters).forEach(key => {
          if (
            key === `name` &&
            filters[key] !== `` &&
            !new RegExp(`${filters[key]}`, `i`).test(`${project[key]}`)
          ) {
            decision = false;
          }
          if (
            key === `startTime` &&
            moment(project[`date`]).isBefore(
              moment(filters[key], `MM-DD-YY HH:mm:ss`)
            )
          ) {
            decision = false;
          }
          if (
            key === `endTime` &&
            moment(project[`date`]).isAfter(
              moment(filters[key], `MM-DD-YY HH:mm:ss`)
            )
          ) {
            decision = false;
          }
          if (key === `isActive` && !!project[key] !== !!filters[key]) {
            decision = false;
          }
        });
        return decision;
      });
    }

    return list;
  }
);

export const getAllProjects = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (projects, results) => {
    if (!results || results.length === 0) return null;
    return results
      .map(projectId => {
        return projects[projectId];
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
  }
);

export const getActiveProjects = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (projects, results) => {
    if (!results || results.length === 0) return null;
    return results
      .map(projectId => {
        return projects[projectId];
      })
      .filter(project => {
        return !!project.isActive;
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
  }
);

export const getAllProjectObjects = createSelector(getAllProjects, projects => {
  // if the task array is empty
  if (!projects) return null;
  // reduce the task array to a object with id as they key
  return Object.assign(
    {},
    ...projects.map(object => ({ [object.id]: object }))
  );
});
