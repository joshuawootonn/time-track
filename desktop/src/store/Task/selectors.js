import { createSelector } from 'reselect';
import { getAnalyzeState } from 'store/Analyze/selectors';
import { getDimensionsFromEntities } from 'store/Dimension/selectors';
import { getCategoriesFromEntities } from 'store/Category/selectors';
import { getSubcategoriesFromEntities } from 'store/Subcategory/selectors';

export const getTasksFromEntities = state => state.entities.tasks;
export const getTasksFromResults = state => state.results.tasks;

export const getAllTasks = createSelector(
  getTasksFromEntities,
  getTasksFromResults,
  (tasks, results) => {
    if (!results || results.length === 0) return null;
    return results
      .map(taskId => {
        return tasks[taskId];
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
  }
);

// ICEBOX: Test and migrate Task selectors
export const getAllTasksNew = createSelector(
  getTasksFromEntities,
  getTasksFromResults,
  getDimensionsFromEntities,
  getCategoriesFromEntities,
  getSubcategoriesFromEntities,
  (_, props) => (props ? props.sorts : null),
  (_, props) => (props ? props.filters : null),
  (tasks, results, dimensions, categories, subcategories, sorts, filters) => {
    if (!results || results.length === 0) return null;
    //console.log(dimensions,categories,subcategories);
    let list = results.map(taskId => {
      const task = tasks[taskId];
      return {
        ...task,
        subcategory: subcategories && subcategories[task.subcategoryId],
        category:
          categories &&
          subcategories &&
          categories[subcategories[task.subcategoryId].categoryId],
        dimension:
          dimensions &&
          subcategories &&
          dimensions[subcategories[task.subcategoryId].dimensionId]
      };
    });

    if (sorts) {
      list = list.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    }

    if (filters) {
      list = list.filter(task => {
        let decision = true;
        Object.keys(filters).forEach(key => {
          if (
            key === `name` &&
            filters[key] !== `` &&
            !new RegExp(`^${filters[key]}`, `i`).test(`${task[key]}`)
          ) {
            decision = false;
          }
          if (key === `isActive` && !!task[key] !== !!filters[key]) {
            decision = false;
          }
          if (
            key === `subcategoryId` &&
            filters[key] !== -1 &&
            filters[key] !== task[`subcategory`][`id`]
          ) {
            decision = false;
          }
          if (
            key === `categoryId` &&
            filters[key] !== -1 &&
            filters[key] !== task[`category`][`id`]
          ) {
            decision = false;
          }
        });
        return decision;
      });
    }

    return list;
  }
);

export const getAllTasksWithContent = createSelector(
  getTasksFromEntities,
  getTasksFromResults,
  getDimensionsFromEntities,
  getCategoriesFromEntities,
  getSubcategoriesFromEntities,
  (tasks, results, dimensions, categories, subcategories) => {
    if (!results || results.length === 0) return null;
    //console.log(dimensions,categories,subcategories);
    return results
      .map(taskId => {
        const task = tasks[taskId];

        return {
          ...task,
          subcategory: subcategories && subcategories[task.subcategoryId],
          category:
            categories &&
            subcategories &&
            categories[subcategories[task.subcategoryId].categoryId],
          dimension:
            dimensions &&
            subcategories &&
            dimensions[subcategories[task.subcategoryId].dimensionId]
        };
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
  }
);

export const getAllTaskObjects = createSelector(
  getAllTasksWithContent,
  tasks => {
    // if the task array is empty
    if (!tasks) return null;
    // reduce the task array to a object with id as they key
    return Object.assign({}, ...tasks.map(object => ({ [object.id]: object })));
  }
);

export const getSelectedTask = createSelector(
  getTasksFromEntities,
  getSubcategoriesFromEntities,
  getAnalyzeState,
  (tasks, subcategories, analyze) => {
    if (analyze.task === -1) return {};
    else {
      const temp = tasks[analyze.task];
      return {
        ...temp,
        categoryId: subcategories[temp.subcategoryId].categoryId
      };
    }
  }
);
