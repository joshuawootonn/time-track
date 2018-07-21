import { user as userActionTypes } from 'constants/ActionTypes';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import * as schemas from '../schemas';

export const login = (username, password) => {
  return dispatch => {
    dispatch({ type: userActionTypes.USER_LOGIN_REQUEST });

    return endpoint.login(username, password).then(
      response => {
        return dispatch({
          type: userActionTypes.USER_LOGIN_SUCCESS,
          payload: response.data,
        });
      },
      error => {
        dispatch({ type: userActionTypes.USER_LOGIN_FAILURE, payload: error });
        throw error;
      },
    );
  };
};
