import { createSelector } from 'reselect';
import { getAnalyzeState } from 'store/Analyze/selectors';
import { getAllTaskObjects } from 'store/Task/selectors';
import { getAllProjectObjects,getProjectsFromEntities } from 'store/Project/selectors';

export const getProjectTasksFromEntities = state => state.entities.projectTasks;
export const getProjectTasksFromResults = state => state.results.projectTasks;


export const getAllProjectTasks = createSelector(  
  getProjectTasksFromEntities,
  getProjectTasksFromResults,
  getAllTaskObjects,
  getAllProjectObjects,
  (projectTasks, results,tasks,projects) => {
    if (!results || results.length === 0) return null;
    return results.map(projectTaskId => {
      return {
        ...projectTasks[projectTaskId],
        task: tasks && tasks[projectTasks[projectTaskId].taskId],
        project: projects && projects[projectTasks[projectTaskId].projectId]
      };
    });
  },
);


export const getAllProjectTasksObjects = createSelector(
  getAllProjectTasks,
  projectTasks => {
    // if the projectTask array is empty
    if (!projectTasks) return null;
    // reduce the projectTask array to a object with id as they key
    return Object.assign({}, ...projectTasks.map(projectTask => ({
      [projectTask.id]: projectTask
    })
    ));    
  },
);


export const getSelectedProject = createSelector(
  getProjectsFromEntities,
  getAnalyzeState,
  getAllProjectTasks,
  (projects,analyze,projectTasks) => {
    if(analyze.project === -1)
      return {};
    else{
      return {
        ...projects[analyze.project],
        projectTasks: projectTasks.filter(projectTask => {
          return projectTask.projectId === projects[analyze.project].id;
        })
      };
    }      
  }
);