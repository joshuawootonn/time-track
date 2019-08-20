import { createSelector } from 'reselect';
import { getAnalyzeState } from 'store/Analyze/selectors';

export const getCategoriesFromEntities = state => state.entities.categories;
export const getCategoriesFromResults = state => state.results.categories;

export const getAllCategories = createSelector(
  getCategoriesFromEntities,
  getCategoriesFromResults,
  (categories, results) => {
    if (!results || results.length === 0) return null;
    return results
      .map(categoryId => {
        return categories[categoryId];
      })
      .sort((a, b) => {
        if (a.type > b.type) return 1;
        if (a.type < b.type) return -1;
        return 0;
      });
  }
);

export const getSelectedCategory = createSelector(
  getCategoriesFromEntities,
  getAnalyzeState,
  (categories, analyze) => {
    if (analyze.category === -1) return {};
    else return categories[analyze.category];
  }
);
