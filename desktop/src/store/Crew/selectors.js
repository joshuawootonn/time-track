import { createSelector } from 'reselect';

export const getCrewsFromEntities = state => state.entities.crews;
export const getCrewsFromResults = state => state.results.crews;

export const getAnalyzeState = state => state.analyze;

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


export const getSelectedCrew = createSelector(
  getCrewsFromEntities,
  getAnalyzeState,
  (crews, analyze) => {
    if(analyze.crew === -1) 
      return {};
    else 
      return crews[analyze.crew];
  }
);