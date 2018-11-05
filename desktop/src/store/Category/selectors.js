import { createSelector } from 'reselect';

export const getCategoriesFromEntities = state => state.entities.categories;
export const getCategoriesFromResults = state => state.results.categories;

export const getAnalyzeState = state => state.analyze;

export const getAllCategories = createSelector(
  getCategoriesFromEntities,
  getCategoriesFromResults,
  (categories, results) => {
    if (!results || results.size === 0) return null;
    return results.map(categoryId => {
      return categories[categoryId];
    });
  },
);

export const getSelectedCategory = createSelector(
  getCategoriesFromEntities,
  getAnalyzeState,
  (categories, analyze) => {
    if(analyze.category === -1) 
      return {};
    else 
      return categories[analyze.category];
  }
);