import * as actions from 'constants/actionsTypes';
import * as status from 'constants/status';
export const userInitialState = {
  status: status.INIT,
  data: null,
  selected: null,
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return {
        ...state,
        status: status.LOADING,
      };
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        status: status.SUCCESS,
      };
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        data: action.payload,
        status: status.FAILURE,
      };

    default:
      return state;
  }
};
