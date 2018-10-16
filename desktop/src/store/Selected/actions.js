import { selectedActionTypes } from 'constants/ActionTypes';

export const getEmployees = employee => {
  return { type: selectedActionTypes.SELECT_EMPLOYEE, payload: employee };    
};