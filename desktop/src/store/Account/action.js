import * as types from 'constants/actionsTypes';
import * as endpoint from './endpoint';
import { normalize } from 'normalizr';

export const getAccountByPin = pin => {
  return dispatch => {
    dispatch({ type: types.ACCOUNT_LOGIN_REQUEST });

    return endpoint.getAccountByPin(pin).then(
      response => {
        dispatch({ type: types.ACCOUNT_LOGIN_SUCCESS, payload: response });
      },
      error => {
        dispatch({ type: types.ACCOUNT_LOGIN_FAILURE, payload: error });
      },
    );
  };
};
