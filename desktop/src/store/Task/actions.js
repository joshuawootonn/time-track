import { taskActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import { taskArray } from 'store/schemas';
import { normalizeEmbeddedData } from 'helpers/store';

export const getTasks = () => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.GET_TASKS_REQUEST });
    try {
  
      const response = await endpoint.getTasks(); 
      let payload = normalize({ tasks: response.data }, taskArray);

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

