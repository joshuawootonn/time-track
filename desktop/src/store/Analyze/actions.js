import { analyzeActionTypes } from 'constants/ActionTypes';

export const selectEmployee = employee => {
  return { type: analyzeActionTypes.SELECT_EMPLOYEE, payload: employee };    
};
export const setEmployeeStatus = status => {
  return { type: analyzeActionTypes.SET_EMPLOYEE_STATUS, payload: status };    
};