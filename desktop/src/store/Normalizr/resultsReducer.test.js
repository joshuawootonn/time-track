import resultReducer,{ payloadCustomizer } from 'store/Normalizr/resultsReducer';

describe('Result Reducer', () => {   
  it('payloadCustomizer should return unique objValue if it is an array', () => {
    const result = payloadCustomizer([1,2,3,3,2,4],[1,2,3]);    
    expect(result).toEqual([1,2,3,4]);
  }); 
  it('should mergeWith and add to existing initial state', () => {
    const existingState = {}; 
    const fakeAction =  { payload:{ result: { users: [1] } } };
    const expectedState = { users: [1] }; 
    const resultingState = resultReducer(existingState,fakeAction);    
    expect(expectedState).toEqual(resultingState);
  });
  it('should mergeWith and add to existing entities', () => {
    const existingState = { users: [1] }; 
    const fakeAction =  { payload:{ result: { users: [2] } } };
    const expectedState = { users: [1,2] }; 
    const resultingState = resultReducer(existingState,fakeAction);    
    expect(expectedState).toEqual(resultingState);
  });
  it('should mergeWith and add to existing entities', () => {
    const existingState = { users: [1] }; 
    const fakeAction =  { deleted:{ result: { users: [1] } } };
    const expectedState = { users: [] }; 
    const resultingState = resultReducer(existingState,fakeAction);    
    expect(expectedState).toEqual(resultingState);
  });
  it('should return same state for invalid action', () => {
    const wackAction = { type: 'asdf' };
    const resultingState = resultReducer({},wackAction);
    expect({}).toEqual(resultingState);    
  });
});