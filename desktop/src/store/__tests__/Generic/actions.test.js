import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';

import { genericActions } from 'store/actions';
import domains from 'constants/domains';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
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

  test('dispatch 3 actions for all async actions', () => {
    const expectedActions = [
      {
        type: 'get_employee_request'
      },{
        type: 'get_employee_success',
        payload: []
      }
    ];
    // window.fetch = jest.fn().mockImplementation(() =>
    //   Promise.resolve(mockResponse(200, null, '{"ids":{"provider":' + id + '}}')));
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      
      request.respondWith({
        status: 200,
        response: []
      });
    });
    store.dispatch(genericActions.getAll(domains.EMPLOYEE)).then(() => {
      const dispatchedActionTypes = store.getActions().map(action => action.type);
      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
    
    
    
    // .then(() => {
    //   const dispatchedActionTypes = store.getActions().map(action => action.type);
    //   expect(expectedActions.length).toBe(12);
    //   expect(dispatchedActionTypes).toEqual(expectedActions.map(action => action.type));
      
    //   expect(1).toBe(2);
    // });   
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

