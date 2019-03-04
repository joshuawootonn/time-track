import { dimensionSelectors } from 'store/selectors';

describe('Dimension Selectors', () => {
  test('should have two basic selectors', () => {
    dimensionSelectors.getDimensionsFromEntities({ entities: { dimensions:{} } });
    dimensionSelectors.getDimensionsFromResults({ results: { dimensions:[] } });
  });
  test('getAllDimensions should return null for results.size === 0', () => {
    let returnedValue=dimensionSelectors.getAllDimensions.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=dimensionSelectors.getAllDimensions.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test('getAllDimensions should return a mapped version of results for valid entities and results', () => {
    const returnedValue=dimensionSelectors.getAllDimensions.resultFunc({ 1: { val: 'asdf' } },[1]);
    expect(returnedValue).toEqual([{ val:'asdf' }]);
  }); 
});