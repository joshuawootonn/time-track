import { projectActionTypes } from '~/constants/actionTypeConstants';

import endpoints from './endpoints';
import { snackActions, analyzeActions, genericActions } from '~/store/actions';
import * as status from '~/constants/status';
import domains from '~/constants/domains';

export const getAllProjects = () => {
  return async dispatch => {
    return dispatch(genericActions.getAll(domains.PROJECT));
  };
};

export const createProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.CREATE_PROJECT_REQUEST });
    try {
      const response = await dispatch(
        genericActions.post(domains.PROJECT, project)
      );
      for (const projectTask of project.projectTasks) {
        projectTask.projectId = response.data.id;
        await dispatch(genericActions.post(domains.PROJECTTASK, projectTask));
      }
      await dispatch(analyzeActions.select(domains.PROJECT, response.data.id));
      await dispatch(snackActions.openSnack(status.SUCCESS, `Project Created`));
      return dispatch({ type: projectActionTypes.CREATE_PROJECT_SUCCESS });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Creation Failed`)
      );
      return dispatch({ type: projectActionTypes.CREATE_PROJECT_FAILURE });
    }
  };
};

export const updateProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await dispatch(
        // was getting a 413 (to much data) before I was doing this.
        genericActions.put(domains.PROJECT, {
          ...project,
          projectTasks: undefined
        })
      );
      const { data: projectInDb } = await endpoints.getWithProjectTasks(
        project
      );

      // if in database but not in update delete from database
      for (const projectTaskInDb of projectInDb.projectTasks) {
        if (!project.projectTasks.find(ele => ele.id === projectTaskInDb.id)) {
          await dispatch(
            genericActions.delet(domains.PROJECTTASK, projectTaskInDb.id)
          );
        }
      }
      for (const projectTask of project.projectTasks) {
        // if in the database and in for put
        if (
          projectInDb.projectTasks.find(
            ele => projectTask.id && ele.id === projectTask.id
          )
        ) {
          await dispatch(genericActions.put(domains.PROJECTTASK, projectTask));
        } // otherwise post the new projectTask
        else {
          projectTask.projectId = response.data.id;
          await dispatch(genericActions.post(domains.PROJECTTASK, projectTask));
        }
      }
      await dispatch(snackActions.openSnack(status.SUCCESS, `Project Updated`));
      return dispatch({ type: projectActionTypes.UPDATE_PROJECT_SUCCESS });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Update Failed`)
      );
      return dispatch({ type: projectActionTypes.UPDATE_PROJECT_FAILURE });
    }
  };
};

export const removeProject = id => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.REMOVE_PROJECT_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.PROJECT));
      await dispatch(genericActions.delet(domains.PROJECT, id));

      await dispatch(snackActions.openSnack(status.SUCCESS, `Project Deleted`));
      return dispatch({ type: projectActionTypes.REMOVE_PROJECT_SUCCESS });
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Project Deletion Failed`)
      );
      return dispatch({ type: projectActionTypes.REMOVE_PROJECT_FAILURE });
    }
  };
};
