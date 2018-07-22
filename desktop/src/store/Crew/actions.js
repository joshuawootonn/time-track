import {crew as crewActionTypes} from 'constants/ActionTypes';

import * as endpoint from './endpoints';
import {normalize} from 'normalizr'

export const getCrews = () => {
  return async dispatch => {
    dispatch({type: crewActionTypes.GET_CREWS_REQUEST})
    try{
      const response = await endpoint.getCrews();
      console.log(response);    
    }catch(e){
      throw e;
    }
  }
}