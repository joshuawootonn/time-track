import ActionTypeHelpers from 'helpers/actionTypes';

describe('Action Type Helper', () => {
  it('should have three functions', () => {
    expect(Object.keys(ActionTypeHelpers).length).toEqual(3);
  });
});