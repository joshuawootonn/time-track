import { createSelector } from 'reselect';

export const getActivitiesFromEntities = state => state.entities.activities;
export const getActivitiesFromResults = state => state.results.activities;

export const getAllActivites = createSelector(
  getActivitiesFromEntities,
  getActivitiesFromResults,
  (activities, results) => {
    if (!results || results.size === 0) return null;
    return results.map(activityId => {
      return activities[activityId];
    });
  },
);


export const getAllActivityObjects = createSelector(
  getAllActivites,
  (activities) => {
    // if the task array is empty
    if (!activities) return null;    
    // reduce the task array to a object with id as they key
    return Object.assign({}, ...activities.map(object => ({[object.id]: object})))
  },
);
