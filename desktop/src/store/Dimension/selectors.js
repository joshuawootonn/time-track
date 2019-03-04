import { createSelector } from 'reselect';

export const getDimensionsFromEntities = state => state.entities.dimensions;
export const getDimensionsFromResults = state => state.results.dimensions;

export const getAllDimensions = createSelector(
  getDimensionsFromEntities,
  getDimensionsFromResults,
  (dimensions, results) => {
    if (!results || results.length === 0) return null;
    return results.map(dimensionId => {
      return dimensions[dimensionId];
    });
  },
);