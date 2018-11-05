import { createSelector } from 'reselect';

export const getSubcategoriesFromEntities = state => state.entities.subcategories;
export const getSubcategoriesFromResults = state => state.results.subcategories;

export const getAnalyzeState = state => state.analyze;

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

export const getSelectedSubcategory = createSelector(
  getSubcategoriesFromEntities,
  getAnalyzeState,
  (subcategories, analyze) => {
    if(analyze.subcategory === -1) 
      return {};
    else 
      return subcategories[analyze.subcategory];
  }
);