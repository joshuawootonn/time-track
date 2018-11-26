export const keyCount = obj => {
  return Object.keys(obj).length;
};

export const compareActionTypes = (
  expectedActionTypes,
  store,
  action
) => {
  expect.assertions(1);
  return store.dispatch(action)
    .finally(() => {
      const dispatchedActionTypes = store.getActions().map(action => action.type);
      expect(dispatchedActionTypes).toEqual(expectedActionTypes);
    }); 
};
export const compareActionTypesSync = (
  expectedActionTypes,
  store,
  action
) => {
  expect.assertions(1);
  store.dispatch(action);
  const dispatchedActionTypes = store.getActions().map(action => action.type);
  expect(dispatchedActionTypes).toEqual(expectedActionTypes);
};
