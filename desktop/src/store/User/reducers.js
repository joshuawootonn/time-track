import { user as userActionTypes } from 'constants/ActionTypes';
import * as status from 'constants/status';
export const userInitialState = {
  status: status.INIT,
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case userActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        status: status.LOADING,
      };
    case userActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.userId,
        access: action.payload.id,
        status: status.SUCCESS,
      };
    case userActionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        status: status.FAILURE,
      };

    default:
      return state;
  }
};
