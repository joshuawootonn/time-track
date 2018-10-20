import { crewActionTypes } from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from 'store/schemas';

export const getCrews = () => {
  return async dispatch => {
    dispatch({ type: crewActionTypes.GET_CREWS_REQUEST });
    try {
      const response = await endpoint.getCrews();
      const payload = normalize({ crews: response.data }, schemas.crewArray);
      console.log('sadf',{ crews: response.data },response.data,payload);
      return dispatch({
        type: crewActionTypes.GET_CREWS_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: crewActionTypes.GET_CREWS_FAILURE,
        payload: e
      });
    }
  };
};
