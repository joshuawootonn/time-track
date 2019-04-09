import entityReducer,{ payloadCustomizer } from 'store/Normalizr/entitiesReducer';

describe(`Entity Reducer`, () => {    
  it(`should mergeWith and add to existing initial state`, () => {
    const existingState = {}; 
    const fakeAction =  { payload:{ entities: { users: { 1: { val: `asdf` } } } } };
    const expectedState = { users: { 1: { val: `asdf` } } }; 
    const resultingState = entityReducer(existingState,fakeAction);    
    expect(expectedState).toEqual(resultingState);
  });
  it(`should mergeWith and add to existing entities`, () => {
    const existingState =  { users: { 1: { val: `asdf` } } }; 
    const fakeAction =  { payload:{ entities: { users: { 2: { val: `zxcv` } } } } };
    const expectedState = { users: { 1: { val: `asdf` }, 2: { val: `zxcv` } } }; 
    const resultingState = entityReducer(existingState,fakeAction);    
    expect(expectedState).toEqual(resultingState);
  });
  it(`should mergeWith and update existing entity`, () => {
    const existingState =  { users: { 1: { val: `asdf` } } }; 
    const fakeAction =  { payload:{ entities: { users: { 1: { val: `zxcv` } } } } };
    const expectedState = { users: { 1: { val: `zxcv` } } }; 
    const resultingState = entityReducer(existingState,fakeAction);    
    expect(expectedState).toEqual(resultingState);
  });
  it(`should delete when deleted.entities is included`, () => {
    const existingState =  { users: { 1: { val: `asdf` } } }; 
    const fakeAction =  { deleted:{ entities: { users: [1] } } };
    const expectedState = { users: { } };  
    const resultingState = entityReducer(existingState,fakeAction);    
    expect(resultingState).toEqual(expectedState);
  });
  it(`payloadCustomizer should return srcValue if it is an array`, () => {
    const result = payloadCustomizer(null,[1,2,3]);    
    expect(result).toEqual([1,2,3]);
  });
  it(`should return same state for invalid action`, () => {
    const wackAction = { type: `asdf` };
    const resultingState = entityReducer({},wackAction);
    expect({}).toEqual(resultingState);    
  });
});