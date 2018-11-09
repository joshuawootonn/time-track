import { projectTaskActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import { projectTaskArray } from 'store/schemas';
import * as schemas from 'store/schemas';

export const getProjectTask = () => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.GET_PROJECT_TASKS_REQUEST });
    try {
      const response = await endpoint.getProjectTasks();
      // console.log(response.data);
      const payload = normalize(
        { projectTasks: response.data },
        projectTaskArray,
      );
      // console.log(response,payload);
      return dispatch({
        type: projectTaskActionTypes.GET_PROJECT_TASKS_SUCCESS,
        payload
      });
      // console.log(response);
    } catch (e) {
      dispatch({
        type: projectTaskActionTypes.GET_PROJECT_TASKS_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};

export const postProjectTask = projectTask => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.POST_PROJECT_TASKS_REQUEST });
    try {
      const response = await endpoint.postProjectTask(projectTask);
      const payload = normalize({ projectTasks: [response.data] }, schemas.projectTaskArray);
    
      return dispatch({ type: projectTaskActionTypes.POST_PROJECT_TASKS_SUCCESS,payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectTaskActionTypes.POST_PROJECT_TASKS_FAILURE,payload: e });
    }
  };
};

export const putProjectTask = projectTask => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.PUT_PROJECT_TASKS_REQUEST });
    try {
      const response = await endpoint.putProjectTask(projectTask);
      const payload = normalize({ projectTasks: [response.data] }, schemas.projectTaskArray);
    
      return dispatch({ type: projectTaskActionTypes.PUT_PROJECT_TASKS_SUCCESS,payload });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectTaskActionTypes.PUT_PROJECT_TASKS_FAILURE,payload: e });
    }
  };
};

export const deleteProjectTask = projectTask => {
  return async dispatch => {
    dispatch({ type: projectTaskActionTypes.DELETE_PROJECT_TASKS_REQUEST });
    try {
      const response = await endpoint.deleteProjectTask(projectTask);
      const deleted = {
        entities:{
          projectTasks: [projectTask.id]
        },
        result: {
          projectTasks: [projectTask.id]
        }
      };

      return dispatch({ type: projectTaskActionTypes.DELETE_PROJECT_TASKS_SUCCESS,deleted });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectTaskActionTypes.DELETE_PROJECT_TASKS_FAILURE,payload: e });
    }
  };
};