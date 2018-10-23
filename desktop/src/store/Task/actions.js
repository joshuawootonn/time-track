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
  console.log(task);
};
export const deleteTask = task => {
  console.log(task);
};