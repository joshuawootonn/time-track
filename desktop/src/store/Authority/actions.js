import {authority as authorityActionTypes} from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import {normalize} from 'normalizr'
import * as schemas from 'store/schemas';

export const getAuthorities = () => {
  return async dispatch => {
    dispatch({type: authorityActionTypes.GET_AUTHORITIES_REQUEST})
    try{
      const response = await endpoint.getAuthorities();
      const payload = normalize(
        { authorities: response.data },
        schemas.authorityArray,
      );
      return dispatch({
        type: authorityActionTypes.GET_AUTHORITIES_SUCCESS,
        payload,
      });
      console.log(response);    
    }catch(e){
      dispatch({
        type: authorityActionTypes.GET_AUTHORITIES_FAILURE,
        payload: e,
      });
      throw e;
    }
  }
}