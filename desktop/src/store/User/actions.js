import * as types from 'constants/actionsTypes';
import * as endpoint from './endpoints';


export const login = (username, password) => {

  return dispatch => {
    dispatch({ type: types.USER_LOGIN_REQUEST });

    return endpoint.login(username, password).then(
      response => {
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data })
        return Promise.resolve();
      },
      error => {
        dispatch({ type: types.USER_LOGIN_FAILURE, payload: error })
        return Promise.reject(error);
      }
    )

  };
};
