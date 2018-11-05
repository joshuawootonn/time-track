import { createSelector } from 'reselect';

export const getAuthoritiesFromEntities = state => state.entities.authorities;
export const getAuthoritiesFromResults = state => state.results.authorities;

export const getAnalyzeState = state => state.analyze;

export const getAllAuthorities = createSelector(
  getAuthoritiesFromEntities,
  getAuthoritiesFromResults,
  (authorities, results) => {
    if (!results || results.size === 0) return null;
    return results.map(authorityId => {
      return authorities[authorityId];
    });
  },
);


export const getSelectedAuthority = createSelector(
  getAuthoritiesFromEntities,
  getAnalyzeState,
  (authorities, analyze) => {
    if(analyze.authority === -1) 
      return {};
    else 
      return authorities[analyze.authority];
  }
);