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
    return results.map(taskId => {
      return tasks[taskId];
    });
  },
);

export const getAllTasksWithContent = createSelector(
  getTasksFromEntities,
  getTasksFromResults,
  getDimensionsFromEntities,
  getCategoriesFromEntities,
  getSubcategoriesFromEntities,
  (tasks,results,dimensions,categories,subcategories) => {    
    if(!results || results.length === 0) return null;
    return results.map(taskId => {
      const task = tasks[taskId];
      return {
        ...task,
        subcategory: subcategories && subcategories[task.subcategoryId],
        category: categories && subcategories && categories[subcategories[task.subcategoryId].categoryId],
        dimension: dimensions && subcategories && dimensions[subcategories[task.subcategoryId].dimensionId] 
      };
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
  },
);

export const getSelectedTask = createSelector(
  getTasksFromEntities,
  getSubcategoriesFromEntities,
  getAnalyzeState,
  (tasks,subcategories,analyze) => {
    if(analyze.task === -1)
      return {};
    else{
      const temp = tasks[analyze.task];
      return { ...temp,categoryId: subcategories[temp.subcategoryId].categoryId };
    }      
  }
);