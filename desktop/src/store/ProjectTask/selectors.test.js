import { projectTaskSelectors,projectSelectors } from 'store/selectors';
import { initialState } from 'store/Analyze/reducers';

describe('Subcategory Selectors', () => {
  test('should have two basic selectors', () => {
    projectTaskSelectors.getProjectTasksFromEntities({ entities: { projectTasks:{} } });
    projectTaskSelectors.getProjectTasksFromResults({ results: { projectTasks:[] } });
  });
  test('getAllSubcategories should return null for results.size === 0', () => {
    let returnedValue=projectTaskSelectors.getAllProjectTasks.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=projectTaskSelectors.getAllProjectTasks.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test('getAllSubcategories should return a mapped version of results for valid entities and results', () => {
    const returnedValue=projectTaskSelectors.getAllProjectTasks.resultFunc({ 1: { val: 'asdf',projectId: 1, taskId:1 } },[1],{ 1: { val: 'zxcv' } },{ 1: { val: 'qwer' } });
    expect(returnedValue).toEqual([{ val:'asdf',projectId: 1, project: { val: 'qwer' },taskId: 1, task: { val: 'zxcv' } }]);
  });
  test('getAllProjectTasksObjects should return object of task with content on valid content', () => {
    let returnedValue = projectTaskSelectors.getAllProjectTasks.resultFunc(
      { 1:{ val:'asdf',projectId: 1,taskId: 1, id: 4 } },//task ent
      [1],//task res
      { 1: { val: 'c' } },//task ent
      { 1: { val: 'b' } },//project ent
    );
    returnedValue = projectTaskSelectors.getAllProjectTasksObjects.resultFunc(returnedValue);
    expect(returnedValue).toEqual({
      4: {
        val: 'asdf',
        id: 4, 
        projectId: 1,
        taskId: 1, 
        task:{ val: 'c' },
        project: { val: 'b' }
      }
    });
  });
  test('getAllProjectTasksObjects should return null if there are no tasks', () => {
    let returnedValue = projectTaskSelectors.getAllProjectTasks.resultFunc(
      { 1:{ val:'asdf',projectId: 1,taskId: 1 } },//task ent
      [],//task res
      { 1: { val: 'c' } },//task ent
      { 1: { val: 'b' } },//project ent
    );
    returnedValue = projectTaskSelectors.getAllProjectTasksObjects.resultFunc(returnedValue);
    expect(returnedValue).toBeNull();
  });
  test('getSelectedProject should return {} for when analyze.authority -1  ', () => {
    const projectEntities = projectSelectors.getProjectsFromEntities({ entities: { projects:{} } });
    const allProjectTasks=projectTaskSelectors.getAllProjectTasks.resultFunc({ 1: { val: 'asdf',projectId: 1, taskId:1 } },[1],{ 1: { val: 'zxcv' } },{ 1: { val: 'qwer' } });
    const returnedValue = projectTaskSelectors.getSelectedProject.resultFunc(projectEntities,initialState,allProjectTasks);
    expect(returnedValue).toEqual({});
  });
  test('getSelectedProject should return selected authority when', () => { 
    const projectEntities = projectSelectors.getProjectsFromEntities({ entities: { projects:{ 1: { id: 1, val: 'asdf' } } } });
    const allProjectTasks=projectTaskSelectors.getAllProjectTasks.resultFunc({ 1: { val: 'asdf',projectId: 1, taskId:1 } },[1],{ 1: { val: 'zxcv' } },{ 1: { val: 'qwer' } });
    const returnedValue = projectTaskSelectors.getSelectedProject.resultFunc(projectEntities,{ ...initialState,project:1 },allProjectTasks);
    expect(returnedValue).toEqual( { id: 1, projectTasks: [{ project: { val: 'qwer' }, projectId: 1, task: { val: 'zxcv' }, taskId: 1, val: 'asdf' }]
      , val: 'asdf' }); 
  });  
}); 