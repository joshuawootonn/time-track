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

export const selectProject = project => {
  return { type: analyzeActionTypes.SELECT_PROJECT, payload: project };    
};
export const setProjectStatus = status => {
  return { type: analyzeActionTypes.SET_PROJECT_STATUS, payload: status };    
};

export const selectShift = shift => {
  return { type: analyzeActionTypes.SELECT_SHIFT, payload: shift };
};
export const setShiftStatus = status => {
  return { type: analyzeActionTypes.SET_SHIFT_STATUS, payload: status };
};