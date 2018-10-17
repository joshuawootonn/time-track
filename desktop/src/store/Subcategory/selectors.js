import { createSelector } from 'reselect';

export const getSubcategoriesFromEntities = state => state.entities.subcategories;
export const getSubcategoriesFromResults = state => state.results.subcategories;

export const getAllSubcategories = createSelector(
  getSubcategoriesFromEntities,
  getSubcategoriesFromResults,
  (subcategories, results) => {
    if (!results || results.size === 0) return null;
    return results.map(subcategoryId => {
      return subcategories[subcategoryId];
    });
  },
);