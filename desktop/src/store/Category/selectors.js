import { createSelector } from 'reselect';

export const getCategoriesFromEntities = state => state.entities.categories;
export const getCategoriesFromResults = state => state.results.categories;

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