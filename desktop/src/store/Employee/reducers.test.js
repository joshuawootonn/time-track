import employeeReducer, { initialState } from 'store/Employee/reducers';
import * as status from 'constants/status';
import { employeeActionTypes } from 'constants/actionTypeConstants';

describe('Employee Reducer', () => { 
  it('login_employee_request should set current.status to LOADING', () => {
    const requestAction = { type: employeeActionTypes.LOGIN_EMPLOYEE_REQUEST };
    const resultingState = employeeReducer(initialState,requestAction);
    expect(resultingState.current.status).toBe(status.LOADING);
  });
  it('login_employee_success should set current.status to SUCCESS and current.id to given id', () => {
    const requestAction = { type: employeeActionTypes.LOGIN_EMPLOYEE_REQUEST };
    const intermediateState = employeeReducer(initialState,requestAction);
    const successAction = { type: employeeActionTypes.LOGIN_EMPLOYEE_SUCCESS,data: { id: 1 } };
    const resultingState = employeeReducer(intermediateState,successAction);
    expect(resultingState.current.status).toBe(status.SUCCESS);
    expect(resultingState.current.id).toBe(1);    
  });
  it('login_employee_failure should set current.status to FAILURE, current.id to NULL,selected to NULL', () => {
    const requestAction = { type: employeeActionTypes.LOGIN_EMPLOYEE_REQUEST };
    const intermediateState = employeeReducer(initialState,requestAction);
    const successAction = { type: employeeActionTypes.LOGIN_EMPLOYEE_FAILURE };
    const resultingState = employeeReducer(intermediateState,successAction);
    expect(resultingState.current.status).toBe(status.FAILURE);
    expect(resultingState.current.id).toBeNull();    
  });  
  it('should return same state for invalid action', () => {
    const wackAction = { type: 'asdf' };
    const resultingState = employeeReducer(initialState,wackAction);
    expect(initialState).toBe(resultingState);    
  });
});