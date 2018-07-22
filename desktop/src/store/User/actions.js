import { user as userActionTypes } from 'constants/ActionTypes';

import {authority as authorityActions, crew as crewActions} from 'store/actions';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from '../schemas';

export const login = (username, password) => {
  return async dispatch => {
    dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });
    try {
      const response = await endpoint.login(username, password);

      await dispatch(authorityActions.getAuthorities());
      await dispatch(crewActions.getCrews());
      
      dispatch({
        type: userActionTypes.USER_LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({ type: userActionTypes.USER_LOGIN_FAILURE, payload: e });
      throw e;
    }
  };
};
