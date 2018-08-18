import {projectTaskActionTypes} from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import {normalize} from 'normalizr'
import {projectTaskArray} from 'store/schemas';

export const getProjectTask = () => {
  return async dispatch => {
    dispatch({type: projectTaskActionTypes.GET_PROJECT_TASKS_REQUEST})
    try{
      const response = await endpoint.getProjectTasks();
      const payload = normalize(
        { projectTask: response.data},
        projectTaskArray,
      );
      console.log(response,payload);
      return dispatch({
        type: projectTaskActionTypes.GET_PROJECT_TASKS_SUCCESS,
        payload,
      });
      console.log(response);    
    }catch(e){
      dispatch({
        type: projectTaskActionTypes.GET_PROJECT_TASKS_FAILURE,
        payload: e,
      });
      throw e;
    }
  }
}