import { taskActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import { taskArray } from 'store/schemas';

export const getTasks = () => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.GET_TASKS_REQUEST });
    try {
      const response = await endpoint.getTasks();
      const payload = normalize({ tasks: response.data }, taskArray);
      //console.log(response,payload);
      return dispatch({
        type: taskActionTypes.GET_TASKS_SUCCESS,
        payload,
      });
      //console.log(response);
    } catch (e) {
      dispatch({
        type: taskActionTypes.GET_TASKS_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
};
