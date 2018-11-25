import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';

import { employeeActions } from 'store/actions';

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
function isPromise(value) {
  return value && Object.prototype.toString.call(value) === '[object Promise]';
}
describe('Employee Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('dispatch 2 actions for getAllEmployees', async () => {
    const expectedActionTypes = [    
      'get_employees_request',    
      'get_employees_success'      
    ];  
    expect.assertions(2);
    await store.dispatch(employeeActions.getAllEmployees());
    const dispatchedActionTypes = store.getActions().map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    expect(1).toBe(2);
    
  });

  // test('dispatch 4 actions for updateEmployee', () => {
  //   const expectedActionTypes = [
  //     'update_employee_request',
  //     'put_employee_request',
  //     'put_employee_success',
  //     'update_employee_success'
  //   ];
  //   requestMock(200,{});
    
  //   store.dispatch(employeeActions.updateEmployee2({})).then(() => {
  //     const dispatchedActionTypes = store.getActions().map(action => action.type);      
  //     expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  //     expect(1).toBe(2);
  //   });
  // });

  // test('dispatch 4 actions for updateEmployee', () => {
  //   const expectedActionTypes = [
  //     'update_employee_request',
  //     'put_employee_request',
  //     'put_employee_success',
  //     'update_employee_failure'
  //   ];
  //   requestMock(400,{});
    
  //   store.dispatch(employeeActions.updateEmployee2({})).then(() => {
  //     const dispatchedActionTypes = store.getActions().map(action => action.type);      
  //     expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  //     console.log('asdf');
  //     expect(1).toBe(2);
  //   });
  // });

});

// .then(() => {
//   const dispatchedActionTypes = store.getActions().map(action => action.type);
//   expect(expectedActions.length).toBe(12);
//   expect(dispatchedActionTypes).toEqual(expectedActions.map(action => action.type));
      
//   expect(1).toBe(2);
// });   

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

