import { taskActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';
import { snackActions } from 'store/actions';
import * as status from 'constants/status';
import { normalizeEmbeddedData } from 'helpers/store';

export const getTasks = () => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.GET_TASKS_REQUEST });
    try {
  
      const response = await endpoint.getTasks(); 
      let payload = normalize({ tasks: response.data }, schemas.taskArray);

      return dispatch({
        type: taskActionTypes.GET_TASKS_SUCCESS,
        payload: normalizeEmbeddedData(payload)
      });
    } catch (e) {
      dispatch({
        type: taskActionTypes.GET_TASKS_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};

export const postTask = task => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.CREATE_TASK_REQUEST });
    try {
      const response = await endpoint.postTask(task);
      const payload = normalize({ tasks: [response.data] }, schemas.taskArray);

      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Task Created'),
      );

      return dispatch({
        type: taskActionTypes.CREATE_TASK_SUCCESS,
        payload
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: taskActionTypes.CREATE_TASK_FAILURE,
        payload: e
      });
    }
  };
};
export const putTask = task => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.UPDATE_TASK_REQUEST });
    try {
      const response = await endpoint.putTask(task.id,task);
      const payload = normalize({ tasks: [response.data] }, schemas.taskArray);

      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Task Updated'),
      );

      return dispatch({
        type: taskActionTypes.UPDATE_TASK_SUCCESS,
        payload
      });
    } catch (e) {
      console.log(e);
      return dispatch({
        type: taskActionTypes.UPDATE_TASK_FAILURE,
        payload: e
      });
    }
  };
};
export const deleteTask = task => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.DELETE_TASK_REQUEST });
    try {
      const response = await endpoint.deleteTask(task);
      const payload = normalize({ tasks: [response.data] }, schemas.taskArray);

      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Task deleted'),
      );

      const deleted = {
        entities:{
          tasks: [task.id]
        },
        result: {
          tasks: [task.id]
        }
      }

      return dispatch({
        type: taskActionTypes.DELETE_TASK_SUCCESS,
        deleted
      });
    } catch (e) {
      console.log(e);
      await dispatch(
        snackActions.openSnack(status.FAILURE, 'Task deletion failed!'),
      );
      return dispatch({
        type: taskActionTypes.DELETE_TASK_FAILURE,
        payload: e
      });
    }
  };
};