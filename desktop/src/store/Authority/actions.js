import {authority as authorityActionTypes} from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import {normalize} from 'normalizr'

export const getAuthorities = () => {
  return async dispatch => {
    dispatch({type: authorityActionTypes.GET_AUTHORITIES_REQUEST})
    try{
      const response = await endpoint.getAuthorities();
      console.log(response);    
    }catch(e){
      throw e;
    }
  }
}