import { employeeActionTypes } from 'constants/actionTypeConstants';
import * as status from 'constants/status';
export const initialState = {
  current: {
    id: null,
    status: status.INIT
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
  case employeeActionTypes.LOGIN_EMPLOYEE_REQUEST:
    return {
      ...state,
      current: {
        id: null,
        status: status.LOADING
      }
    };
  case employeeActionTypes.LOGIN_EMPLOYEE_SUCCESS:
    return {
      ...state,
      current: {
        id: action.data.id,
        status: status.SUCCESS
      }
    };
  case employeeActionTypes.LOGIN_EMPLOYEE_FAILURE:
    return {
      ...state,
      current: {
        id: null,
        status: status.FAILURE
      },
      selected: null
    };  
  default:
    return state;
  }
};
