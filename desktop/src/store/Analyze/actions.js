import { analyzeActionTypes } from 'constants/ActionTypes';

export const selectEmployee = employee => {
  return { type: analyzeActionTypes.SELECT_EMPLOYEE, payload: employee };    
};
export const setEmployeeStatus = status => {
  return { type: analyzeActionTypes.SET_EMPLOYEE_STATUS, payload: status };    
};
export const selectTask = task => {
  return { type: analyzeActionTypes.SELECT_TASK, payload: task };    
};
export const setTaskStatus = status => {
  return { type: analyzeActionTypes.SET_TASK_STATUS, payload: status };    
};

