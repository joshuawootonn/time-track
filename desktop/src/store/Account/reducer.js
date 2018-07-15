import * as actions from 'constants/actionsTypes';
import * as status from 'constants/status';
export const accountInitialState = {
  status: status.INIT,
  selected: null,
};

export default (state = accountInitialState, action) => {
  switch (action.type) {
    case actions.ACCOUNT_LOGIN_REQUEST:
      return {
        ...state,
        status: status.LOADING,
      };
    case actions.ACCOUNT_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.data,
        status: status.SUCCESS,
      };
    case actions.ACCOUNT_LOGIN_FAILURE:
      return {
        ...state,
        status: status.FAILURE,
      };

    default:
      return state;
  }
};
