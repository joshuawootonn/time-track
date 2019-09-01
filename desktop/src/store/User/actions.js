import { userActionTypes } from 'constants/actionTypeConstants';

import { authorityActions, crewActions } from 'store/actions';
import * as IPCConstants from 'constants/ipc';
import * as endpoint from './endpoints';

const { ipcRenderer } = window.require('electron');

export const login = (ip, username, password) => {
  return async dispatch => {
    dispatch({ type: userActionTypes.LOGIN_USER_REQUEST });
    try {
      const response = await endpoint.login(ip, username, password);
      console.log(response.data.id);
      console.log(
        ipcRenderer.sendSync(IPCConstants.SET_ACCESS_TOKEN, response.data.id)
      );
      await dispatch(authorityActions.getAllAuthorities());
      await dispatch(crewActions.getAllCrews());
      return dispatch({
        type: userActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data
      });
    } catch (e) {
      dispatch({ type: userActionTypes.LOGIN_USER_FAILURE, payload: e });
      return Promise.reject({ message: `Could not connect!` });
    }
  };
};
