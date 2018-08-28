import { projectActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import { projectArray } from 'store/schemas';

export const getProjects = () => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.GET_PROJECTS_REQUEST });
    try {
      const response = await endpoint.getProjects();
      // console.log(response.data);
      const payload = normalize({ projects: response.data }, projectArray);
      // console.log(response,payload);
      return dispatch({
        type: projectActionTypes.GET_PROJECTS_SUCCESS,
        payload,
      });
      // console.log(response);
    } catch (e) {
      dispatch({
        type: projectActionTypes.GET_PROJECTS_FAILURE,
        payload: e,
      });
      throw e;
    }
  };
};
