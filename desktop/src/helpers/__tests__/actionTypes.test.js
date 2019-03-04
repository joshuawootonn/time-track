import ActionTypeHelpers from 'helpers/actionTypes';

const keyCount = obj => {
  return Object.keys(obj).length;
};

describe('Action Type Helper', () => {  
  it('should have three functions', () => {
    expect(keyCount(ActionTypeHelpers)).toEqual(3);
  });
  it('should return an object with 12 values for creatin CRUD action types', () => {
    expect(keyCount(ActionTypeHelpers.createCRUDActionTypes('asdf'))).toEqual(24);
  });
  it('should return an object with 3 values for creatin async action types', () => {
    expect(keyCount(ActionTypeHelpers.createCustomAsyncActionType('asdf','asdf'))).toEqual(3);
  });
  it('should return an object with 1 values for creatin sync action types', () => {
    expect(keyCount(ActionTypeHelpers.createCustomSyncActionType('asdf','asdf'))).toEqual(1);
  });
});