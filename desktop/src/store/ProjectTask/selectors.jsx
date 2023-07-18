import { createSelector } from 'reselect';
import { getAnalyzeState } from '~/store/Analyze/selectors';
import { getAllTaskObjects } from '~/store/Task/selectors';
import {
  getAllProjectObjects,
  getProjectsFromEntities
} from '~/store/Project/selectors';

export const getProjectTasksFromEntities = state =>
  state.entities.project_tasks;
export const getProjectTasksFromResults = state => state.results.project_tasks;

export const getAllProjectTasks = createSelector(
  getProjectTasksFromEntities,
  getProjectTasksFromResults,
  getAllTaskObjects,
  getAllProjectObjects,
  (projectTasks, results, tasks, projects) => {
    if (!results || results.length === 0) return null;
    return results
      .map(projectTaskId => {
        //console.log(tasks && tasks[projectTasks[projectTaskId].taskId])
        return {
          ...projectTasks[projectTaskId],
          task: tasks && tasks[projectTasks[projectTaskId].taskId],
          project: projects && projects[projectTasks[projectTaskId].projectId]
        };
      })
      .sort((a, b) => {
        if (a.task.name > b.task.name) return 1;
        if (a.task.name < b.task.name) return -1;
        return 0;
      });
  }
);

export const getAllProjectTasksObjects = createSelector(
  getAllProjectTasks,
  projectTasks => {
    // if the projectTask array is empty
    if (!projectTasks) return null;
    // reduce the projectTask array to a object with id as they key
    return Object.assign(
      {},
      ...projectTasks.map(projectTask => ({
        [projectTask.id]: projectTask
      }))
    );
  }
);

export const getSelectedProject = createSelector(
  getProjectsFromEntities,
  getAnalyzeState,
  getAllProjectTasks,
  (projects, analyze, projectTasks) => {
    if (analyze.project === -1) return {};
    else {
      return {
        ...projects[analyze.project],
        projectTasks: projectTasks.filter(projectTask => {
          return projectTask.projectId === projects[analyze.project].id;
        })
      };
    }
  }
);
