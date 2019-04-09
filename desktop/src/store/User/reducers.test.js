import userReducer, { initialState } from 'store/User/reducers';
import * as status from 'constants/status';
import { userActionTypes } from 'constants/actionTypeConstants';

describe(`User Reducer`, () => { 
  it(`login_user_request should set current.status to LOADING`, () => {
    const requestAction = { type: userActionTypes.LOGIN_USER_REQUEST };
    const resultingState = userReducer(initialState,requestAction);
    expect(resultingState.status).toBe(status.LOADING);
  });
  it(`login_user_success should set current.status to SUCCESS and current.id to given id`, () => {
    const requestAction = { type: userActionTypes.LOGIN_USER_REQUEST };
    const intermediateState = userReducer(initialState,requestAction);
    const successAction = { type: userActionTypes.LOGIN_USER_SUCCESS,payload: { id: 1,userId: 1 } };
    const resultingState = userReducer(intermediateState,successAction);
    expect(resultingState.status).toBe(status.SUCCESS);
    expect(resultingState.access).toBe(1);    
    expect(resultingState.id).toBe(1);    
    expect(resultingState.access).toBe(1);    
  });
  it(`login_user_failure should set current.status to FAILURE, current.id to NULL,selected to NULL`, () => {
    const requestAction = { type: userActionTypes.LOGIN_USER_REQUEST };
    const intermediateState = userReducer(initialState,requestAction);
    const successAction = { type: userActionTypes.LOGIN_USER_FAILURE };
    const resultingState = userReducer(intermediateState,successAction);
    expect(resultingState.status).toBe(status.FAILURE);
  });  
  it(`should return same state for invalid action`, () => {
    const wackAction = { type: `asdf` };
    const resultingState = userReducer(initialState,wackAction);
    expect(initialState).toBe(resultingState);    
  });
});