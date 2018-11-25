import moxios from 'moxios';

export const keyCount = obj => {
  return Object.keys(obj).length;
};

export const requestMock = (status, payload) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: status,
      response: payload
    });
  });
};

export const compareActionTypes = (
  expectedActionTypes,
  store,
  action,
) => {
  expect.assertions(1);
  return store.dispatch(action)
    .finally(() => {
      const dispatchedActionTypes = store.getActions().map(action => action.type);
      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    });
};
