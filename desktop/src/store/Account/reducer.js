import {account as accountActionTypes} from 'constants/ActionTypes';
import * as status from 'constants/status';
export const accountInitialState = {
  status: status.INIT,
  selected: null,
};

export default (state = accountInitialState, action) => {
  switch (action.type) {
    case accountActionTypes.ACCOUNT_LOGIN_REQUEST:
      return {
        ...state,
        status: status.LOADING,
      };
    case accountActionTypes.ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        status: status.SUCCESS,
      };
    case accountActionTypes.ACCOUNT_LOGIN_FAILURE:
      return {
        ...state,
        status: status.FAILURE,
      };

    default:
      return state;
  }
};
