import { projectSelectors } from 'store/selectors';

describe(`Project Selectors`, () => {
  test(`should have two basic selectors`, () => {
    projectSelectors.getProjectsFromEntities({ entities: { projects:{} } });
    projectSelectors.getProjectsFromResults({ results: { projects:[] } });
  });
  test(`getAllProjects should return null for results.size === 0`, () => {
    let returnedValue=projectSelectors.getAllProjects.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=projectSelectors.getAllProjects.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test(`getAllProjects should return a mapped version of results for valid entities and results`, () => {
    const returnedValue=projectSelectors.getAllProjects.resultFunc({ 1: { val: `asdf` } },[1]);
    expect(returnedValue).toEqual([{ val:`asdf` }]);
  });
  test(`getAllProjects should return a sorted version of the projects it is mapping`, () => {
    const returnedValue=projectSelectors.getAllProjects.resultFunc({ 1: { name: `zxcv` }, 2: { name: `asdf` } },[1,2]);
    expect(returnedValue).toEqual([{ name:`asdf` },{ name: `zxcv` }]);
  });

  test(`getActiveProjects should return null for results.size === 0`, () => {
    let returnedValue=projectSelectors.getActiveProjects.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=projectSelectors.getActiveProjects.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test(`getActiveProjects should return a mapped version of results for valid entities and results`, () => {
    const returnedValue=projectSelectors.getActiveProjects.resultFunc({ 1: { val: `asdf`, isActive: false } },[1]);
    expect(returnedValue).toEqual([]);
  });
  test(`getActiveProjects should return a sorted version of the projects it is mapping`, () => {
    const returnedValue=projectSelectors.getActiveProjects.resultFunc({ 1: { name: `zxcv`, isActive: true }, 2: { name: `asdf`, isActive: true } },[1,2]);
    expect(returnedValue).toEqual([{ name: `asdf`, isActive: true },{ name: `zxcv`, isActive: true }]);
  });

  test(`getAllProjectObjects should return object of task with content on success`, () => {
    let returnedValue=projectSelectors.getAllProjects.resultFunc({ 1: { val: `asdf`, id: 1 } },[1]);
    expect(returnedValue).toEqual([{ val:`asdf`,id: 1 }]);
    returnedValue = projectSelectors.getAllProjectObjects.resultFunc(returnedValue);
    expect(returnedValue).toEqual({ 1: { val: `asdf`,id: 1 } }); 
  });
  test(`getAllProjectObjects should return null if there are no projects`, () => {
    let returnedValue=projectSelectors.getAllProjects.resultFunc({},[]);
    expect(returnedValue).toBeNull();
    returnedValue = projectSelectors.getAllProjectObjects.resultFunc(returnedValue);
    expect(returnedValue).toBeNull(); 
  });

});