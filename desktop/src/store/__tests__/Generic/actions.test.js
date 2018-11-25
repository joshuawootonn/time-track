import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';

import { genericActions } from 'store/actions';
import domains from 'constants/domains';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const requestMock = (status, payload) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: status,
      response: payload
    });
  });
};

describe('Generic Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('dispatch 2 actions for getAll action', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'get_employees_request', 'get_employees_success'];    
    expect.assertions(1);
    return store.dispatch(genericActions.getAll(domains.EMPLOYEE)).then(() => {
      const dispatchedActionTypes = store.getActions().map(action => action.type);
      expect(dispatchedActionTypes).toEqual(expectedActionTypes);      
    });   
  });
  //test('dispatch 2 actions for get action', () )
});



// const assertExpectedSameAsActualActions = (
//   expectedActionTypes,
//   store,
//   action,
//   actionParam = null,
// ) => {
//   return store.dispatch(action(actionParam)).then(() => {
//     const dispatchedActionTypes = store.getActions().map(action => action.type);
//     expect(dispatchedActionTypes).toEqual(expectedActionTypes);
//   });
// };

// export const assertExpectedSameAsActualActionsSync = (
//   expectedActionTypes,
//   store,
//   action,
//   actionParam = null,
// ) => { 
//   store.dispatch(action(actionParam));
//   const dispatchedActionTypes = store.getActions().map(action => action.type);
//   expect(dispatchedActionTypes).toEqual(expectedActionTypes);   
// };

// describe('Project Actions', () => {
//   beforeEach(() => {
//     moxios.install(axios);
//   });
//   afterEach(() => {
//     moxios.uninstall(axios);
//   });
//   // Async
//   it('dispatches GET_PROJECT_REQUEST and GET_PROJECT_SUCCESS on getProject() success', () => {
//     requestMock(200, {});

//     const expectedActionTypes = [types.GET_PROJECT_REQUEST, types.GET_PROJECT_SUCCESS];

//     const store = initializeMockStore(projectMock.state);

//     return assertExpectedSameAsActualActions(expectedActionTypes, store, projectActions.getProject);
//   });
// });

