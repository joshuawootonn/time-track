import { userActionTypes } from 'constants/actionTypeConstants';

import { authorityActions, crewActions } from 'store/actions';

import * as endpoint from './endpoints';

export const login = (username, password) => {
  return async dispatch => {
    dispatch({ type: userActionTypes.LOGIN_USER_REQUEST });
    try {
      const response = await endpoint.login(username, password);

      await dispatch(authorityActions.getAllAuthorities());
      await dispatch(crewActions.getAllCrews());

      return dispatch({ type: userActionTypes.LOGIN_USER_SUCCESS, payload: response.data });
    } catch (e) {
      return dispatch({ type: userActionTypes.LOGIN_USER_FAILURE, payload: e });
    }
  };
};
