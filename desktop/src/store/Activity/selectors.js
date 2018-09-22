import { createSelector } from 'reselect';

export const getActivitiesFromEntities = state => state.entities.activities;
export const getActivitiesFromResults = state => state.results.activities;

// this is bad because they generally aren't base pulled

// export const getAllActivites = createSelector(
//   getActivitiesFromEntities,
//   getActivitiesFromResults,
//   (activities, results) => {
//     if (!results || results.size === 0) return null;
//     return results.map(activityId => {
//       return activities[activityId];
//     });
//   },
// );


// export const getAllActivityObjects = createSelector(
//   getAllActivites,
//   (activities) => {
//     // if the task array is empty
//     if (!activities) return null;    
//     // reduce the task array to a object with id as they key
//     return Object.assign({}, ...activities.map(object => ({[object.id]: object})))
//   },
// );

// /**
//  * Returns an object of arrays with the activities in an array corresponding to the key of their shift
//  */
// export const getAllActivityObjectsByShift = createSelector(
//   getAllActivites,
//   (activities) => {
//     console.log(activities)
//     if(!activities) return null;

//     return activities.reduce((acc,activity) => {
//       console.log(acc,activity)
//       acc[activity.shiftId] = (acc[activity.shiftId] || []).concat(activity)
//       return acc;
//     },{})
//   }
// )