import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

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
  beforeEach(() => { // Runs before each test in the suite
    store.clearActions();
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

    store.dispatch(genericActions.getAll(domains.EMPLOYEE));
    expect(store.getActions()).toEqual(expectedActions);
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

