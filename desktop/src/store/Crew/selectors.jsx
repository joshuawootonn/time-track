import { createSelector } from 'reselect';
import { getAnalyzeState } from '~/store/Analyze/selectors';

export const getCrewsFromEntities = state => state.entities.crews;
export const getCrewsFromResults = state => state.results.crews;

export const getAllCrews = createSelector(
  getCrewsFromEntities,
  getCrewsFromResults,
  (crews, results) => {
    if (!results || results.length === 0) return null;
    return results.map(crewId => {
      return crews[crewId];
    });
  }
);

export const getSelectedCrew = createSelector(
  getCrewsFromEntities,
  getAnalyzeState,
  (crews, analyze) => {
    if (analyze.crew === -1) return {};
    else return crews[analyze.crew];
  }
);

export const getAllCrewObjects = createSelector(getAllCrews, crews => {
  if (!crews) return null;
  return Object.assign(
    {},
    ...crews.map(crew => ({
      [crew.id]: crew
    }))
  );
});
