import { employee as employeeActionTypes } from 'constants/ActionTypes';
import * as status from 'constants/status';
export const employeeInitialState = {
  status: status.INIT,
  selected: null,
  current: null,
};

export default (state = employeeInitialState, action) => {
  switch (action.type) {
    case employeeActionTypes.LOGIN_EMPLOYEE_SUCCESS:
      return {
        ...state,
        current: action.data.id,
      };
    case employeeActionTypes.LOGIN_EMPLOYEE_FAILURE:
      return {
        ...state,
        selected: null,
      };

    default:
      return state;
  }
};
