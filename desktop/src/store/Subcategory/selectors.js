import { createSelector } from 'reselect';
import { getAnalyzeState } from 'store/Analyze/selectors';

export const getSubcategoriesFromEntities = state =>
  state.entities.subcategories;
export const getSubcategoriesFromResults = state => state.results.subcategories;

export const getAllSubcategories = createSelector(
  getSubcategoriesFromEntities,
  getSubcategoriesFromResults,
  (subcategories, results) => {
    if (!results || results.length === 0) return null;
    return results
      .map(subcategoryId => {
        return subcategories[subcategoryId];
      })
      .sort((a, b) => {
        if (a.type > b.type) return 1;
        if (a.type < b.type) return -1;
        return 0;
      });
  }
);

export const getSelectedSubcategory = createSelector(
  getSubcategoriesFromEntities,
  getAnalyzeState,
  (subcategories, analyze) => {
    if (analyze.subcategory === -1) return {};
    else return subcategories[analyze.subcategory];
  }
);
