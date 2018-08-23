import { createSelector } from 'reselect';
import { getTasksFromEntities } from 'store/Task/selectors';
import { getAllProjectTasks } from 'store/ProjectTask/selectors';

export const getProjectsFromEntities = state => state.entities.projects;
export const getProjectsFromResults = state => state.results.projects;

export const getAllProjects = createSelector(
  getProjectsFromEntities,
  getProjectsFromResults,
  (projects, results) => {
    if (!results || results.size === 0) return null;
    return results.map(projectId => {
      return projects[projectId];
    });
  },
);

export const getAllProjectObjects = createSelector(
  getProjectsFromEntities,
  getTasksFromEntities,
  getAllProjectTasks,
  (projects, tasks, projectTasks) => {
    const newProjects = { ...projects };
    projectTasks.forEach(pt => {
      newProjects[pt.projectId].tasks = [
        { ...tasks[pt.taskId], projectTaskId: pt.id },
      ];
    });
    return newProjects;
  },
);
