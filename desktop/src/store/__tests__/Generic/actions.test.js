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

const compareActionTypes = (
  expectedActionTypes,
  store,
  action,
) => {
  expect.assertions(1);
  return store.dispatch(action).then(() => {
    const dispatchedActionTypes = store.getActions().map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
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

  test('dispatch 2 actions for getAll action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'get_employees_request', 'get_employees_success'];   
    return compareActionTypes(expectedActionTypes,store,genericActions.getAll(domains.EMPLOYEE));
  });
  test('dispatch 2 actions for getAll action on failure', () => {
    requestMock(400,[]);
    const expectedActionTypes = [ 'get_employees_request', 'get_employees_failure'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.getAll(domains.EMPLOYEE)); 
  });
  test('dispatch 2 actions for get action on success', () => {
    requestMock(200,[]);
    const expectedActionTypes = [ 'get_employee_request', 'get_employee_success'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.get(domains.EMPLOYEE,1)); 
  }); 
  test('dispatch 2 actions for get action on failure', () => {
    requestMock(400,[]);
    const expectedActionTypes = [ 'get_employee_request', 'get_employee_failure'];        
    return compareActionTypes(expectedActionTypes,store,genericActions.get(domains.EMPLOYEE,1)); 
  }); 

  
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

