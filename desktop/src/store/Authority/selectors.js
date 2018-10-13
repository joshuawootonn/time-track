import { createSelector } from 'reselect';

export const getAuthoritiesFromEntities = state => state.entities.authorities;
export const getAuthoritiesFromResults = state => state.results.authorities;

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