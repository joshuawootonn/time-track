import { analyzeActionTypes } from 'constants/ActionTypes';
import * as analyzeStatus from 'constants/analyze';

const selectedInitialState = {
  employee: {},
  project: {},
  task: {},
  shift: {},
  employeeStatus: analyzeStatus.INIT,
  projectStatus: analyzeStatus.INIT,
  taskStatus: analyzeStatus.INIT,
  shiftStatus: analyzeStatus.INIT
};
export default (state = selectedInitialState, action) => {
  switch (action.type) {
  case analyzeActionTypes.SELECT_EMPLOYEE:
    if (state.employee.id && state.employee.id === action.payload.id) {
      return {
        ...state,
        employee: {}
      };
    } else if (state.employee) {
      return {
        ...state,
        employee: state.employee
      };
    }
    return state;
  case analyzeActionTypes.SET_EMPLOYEE_STATUS:
    return {
      ...state,
      employeeStatus: action.payload
    };
  default:
    return state;
  }
};
