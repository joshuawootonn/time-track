import { crewSelectors } from 'store/selectors';
import { initialState } from 'store/Analyze/reducers';

describe('Crew Selectors', () => {
  test('should have two basic selectors', () => {
    crewSelectors.getCrewsFromEntities({ entities: { crews:{} } });
    crewSelectors.getCrewsFromResults({ results: { crews:[] } });
  });
  test('getAllCrews should return null for results.size === 0', () => {
    let returnedValue=crewSelectors.getAllCrews.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=crewSelectors.getAllCrews.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test('getAllCrews should return a mapped version of results for valid entities and results', () => {
    const returnedValue=crewSelectors.getAllCrews.resultFunc({ 1: { val: 'asdf' } },[1]);
    expect(returnedValue).toEqual([{ val:'asdf' }]);
  });
  test('getSelectedCrew should return {} for when analyze.crew -1  ', () => {
    const returnedValue = crewSelectors.getSelectedCrew.resultFunc({},initialState);
    expect(returnedValue).toEqual({});
  });
  test('getSelectedCrew should return selected authority when', () => {
    const returnedValue = crewSelectors.getSelectedCrew.resultFunc({ 1: { value: 'asdf' } },{ ...initialState,crew:1 });
    expect(returnedValue).toEqual({ value:'asdf' }); 
  });
  
});