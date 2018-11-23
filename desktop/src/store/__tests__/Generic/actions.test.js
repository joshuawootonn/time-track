import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const requestMock = (status, payload) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: status,
      response: payload
    });
  });
};
const initializeMockStore = projects => {
  return mockStore({ projects });
};

const assertExpectedSameAsActualActions = (
  expectedActionTypes,
  store,
  action,
  actionParam = null,
) => {
  return store.dispatch(action(actionParam)).then(() => {
    const dispatchedActionTypes = store.getActions().map(action => action.type);
    expect(dispatchedActionTypes).toEqual(expectedActionTypes);
  });
};

export const assertExpectedSameAsActualActionsSync = (
  expectedActionTypes,
  store,
  action,
  actionParam = null,
) => { 
  store.dispatch(action(actionParam));
  const dispatchedActionTypes = store.getActions().map(action => action.type);
  expect(dispatchedActionTypes).toEqual(expectedActionTypes);   
};

describe('Project Actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  // Async
  it('dispatches GET_PROJECT_REQUEST and GET_PROJECT_SUCCESS on getProject() success', () => {
    requestMock(200, {});

    const expectedActionTypes = [types.GET_PROJECT_REQUEST, types.GET_PROJECT_SUCCESS];

    const store = initializeMockStore(projectMock.state);

    return assertExpectedSameAsActualActions(expectedActionTypes, store, projectActions.getProject);
  });
});