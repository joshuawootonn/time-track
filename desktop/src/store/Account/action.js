import * as types from 'constants/actionsTypes';
import * as endpoint from './endpoints';
import { normalize } from 'normalizr';

export const getAccount(pin){
  const getAccountByPin = endpoint.getAccountByPin(pin);
  return dispatch => {
    dispatch({type: types.ACCOUNT_LOGIN_REQUEST});
    return getAccountByPin.then(
      response => {
        dispatch({ type: types.ACCOUNT_LOGIN_SUCCESS, payload: response });
      },
      error => {
        dispatch({ type: types.ACCOUNT_LOGIN_FAILURE, payload: error });
      }
    )
  }
}