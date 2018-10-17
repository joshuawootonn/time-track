import { taskActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import { taskArray } from 'store/schemas';
import { normalizeEmbeddedData } from 'helpers/store';
import { categoryActions, subcategoryActions, dimensionActions } from 'store/actions';

export const getTasks = () => {
  return async dispatch => {
    dispatch({ type: taskActionTypes.GET_TASKS_REQUEST });
    try {

      await dispatch(categoryActions.getCategories());
      await dispatch(subcategoryActions.getSubcategories());
      await dispatch(dimensionActions.getDimensions());

      const response = await endpoint.getTasks();

      
      
      let payload = normalize({ tasks: response.data }, taskArray);
      console.log(response.data,payload)
      //payload = normalizeEmbeddedData(payload);

      //console.log(response.data,payload);
      return dispatch({
        type: taskActionTypes.GET_TASKS_SUCCESS,
        payload
      });
      // console.log(response);
    } catch (e) {
      dispatch({
        type: taskActionTypes.GET_TASKS_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};

