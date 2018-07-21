import {account as accountActionTypes} from 'constants/ActionTypes';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';

export const getAccountByPin = pin => {
  return dispatch => {
    dispatch({ type: accountActionTypes.ACCOUNT_LOGIN_REQUEST });

    return endpoint.getAccountByPin(pin).then(
      response => {
        dispatch({ type: accountActionTypes.ACCOUNT_LOGIN_SUCCESS, payload: response });
      },
      error => {
        dispatch({ type: accountActionTypes.ACCOUNT_LOGIN_FAILURE, payload: error });
        throw error
      },
    );
  };
};
export const getMostRecentShift = id => {
  
}

