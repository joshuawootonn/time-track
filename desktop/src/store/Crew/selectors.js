import { createSelector } from 'reselect';

export const getCrewsFromEntities = state => state.entities.crews;
export const getCrewsFromResults = state => state.results.crews;

export const getAllCrews = createSelector(
  getCrewsFromEntities,
  getCrewsFromResults,
  (crews, results) => {
    if (!results || results.size === 0) return null;
    return results.map(crewId => {
      return crews[crewId];
    });
  },
);