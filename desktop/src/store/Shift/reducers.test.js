import shiftReducer, { initialState } from 'store/Shift/reducers';
import * as status from 'constants/status';
import { shiftActionTypes } from 'constants/actionTypeConstants';

describe('Employee Reducer', () => { 
  it('get_currrent_shift_request should set current.status to LOADING', () => {
    const requestAction = { type: shiftActionTypes.GET_CURRENT_SHIFT_REQUEST };
    const resultingState = shiftReducer(initialState,requestAction);
    expect(resultingState.current.status).toBe(status.LOADING);
  });
  it('get_current_shift_success should set current.status to SUCCESS and current.id to given id', () => {
    const requestAction = { type: shiftActionTypes.GET_CURRENT_SHIFT_REQUEST };
    const intermediateState = shiftReducer(initialState,requestAction);
    const successAction = { type: shiftActionTypes.GET_CURRENT_SHIFT_SUCCESS,data: { id: 1 } };
    const resultingState = shiftReducer(intermediateState,successAction);
    expect(resultingState.current.status).toBe(status.SUCCESS);
    expect(resultingState.current.id).toBe(1);    
  });
  it('get_current_shift_failure should set current.status to FAILURE, current.id to NULL,selected to NULL', () => {
    const requestAction = { type: shiftActionTypes.GET_CURRENT_SHIFT_REQUEST };
    const intermediateState = shiftReducer(initialState,requestAction);
    const successAction = { type: shiftActionTypes.GET_CURRENT_SHIFT_FAILURE };
    const resultingState = shiftReducer(intermediateState,successAction);
    expect(resultingState.current.status).toBe(status.FAILURE);
    expect(resultingState.current.id).toBeNull();    
  });  
  it('should return same state for invalid action', () => {
    const wackAction = { type: 'asdf' };
    const resultingState = shiftReducer(initialState,wackAction);
    expect(initialState).toBe(resultingState);    
  });
});