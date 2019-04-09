import { taskSelectors } from 'store/selectors';
import { initialState } from 'store/Analyze/reducers';

describe(`Subcategory Selectors`, () => {
  test(`should have two basic selectors`, () => {
    taskSelectors.getTasksFromEntities({ entities: { tasks:{} } });
    taskSelectors.getTasksFromResults({ results: { tasks:[] } });
  });
  test(`getAllSubcategories should return null for results.size === 0`, () => {
    let returnedValue=taskSelectors.getAllTasks.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=taskSelectors.getAllTasks.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test(`getAllSubcategories should return a mapped version of results for valid entities and results`, () => {
    const returnedValue=taskSelectors.getAllTasks.resultFunc({ 1: { val: `asdf` } },[1]);
    expect(returnedValue).toEqual([{ val:`asdf` }]);
  });
  test(`getSelectedSubcategory should return {} for when analyze.authority -1  `, () => {
    const returnedValue = taskSelectors.getSelectedTask.resultFunc({},{},initialState);
    expect(returnedValue).toEqual({});
  });
  test(`getSelectedSubcategory should return selected authority when`, () => {
    const returnedValue = taskSelectors.getSelectedTask.resultFunc(
      { 1: { value: `asdf`,subcategoryId: 1 } },
      { 1: { value: `zxcv`,categoryId: 1 } },
      { ...initialState,task:1 }
    );
    expect(returnedValue).toEqual({ value:`asdf`, categoryId: 1, subcategoryId: 1 });
  });  
  test(`getAllTasksWithContent should return array of task with content on valid content`, () => {
    const returnedValue = taskSelectors.getAllTasksWithContent.resultFunc(
      { 1:{ val:`asdf`,subcategoryId: 1 } },//task ent
      [1],//task res
      { 1: { val: `c` } },//dim ent
      { 1: { val: `b` } },//cat ent
      { 1: { val: `a`, dimensionId: 1,categoryId: 1 } }//sub ent
    );
    expect(returnedValue).toEqual([{
      val: `asdf`, 
      subcategoryId: 1, 
      subcategory: { val: `a`, dimensionId: 1,categoryId:1 },
      dimension:{ val: `c` },
      category: { val: `b` }
    }]);
  });
  test(`getAllTasksWithContent should return null if tasks is falsey`, () => {
    const returnedValue = taskSelectors.getAllTasksWithContent.resultFunc(
      { 1:{ val:`asdf`,subcategoryId: 1 } },//task ent
      [],//task res
      { 1: { val: `c` } },//dim ent
      { 1: { val: `b` } },//cat ent
      { 1: { val: `a`, dimensionId: 1,categoryId: 1 } }//sub ent
    );
    expect(returnedValue).toBeNull();
  });
  test(`getAllTaskObjects should return object of task with content on valid content`, () => {
    let returnedValue = taskSelectors.getAllTasksWithContent.resultFunc(
      { 1:{ val:`asdf`,subcategoryId: 1, id: 4 } },//task ent
      [1],//task res
      { 1: { val: `c` } },//dim ent
      { 1: { val: `b` } },//cat ent
      { 1: { val: `a`, dimensionId: 1,categoryId: 1 } }//sub ent
    );
    returnedValue = taskSelectors.getAllTaskObjects.resultFunc(returnedValue);
    expect(returnedValue).toEqual({
      4: {
        val: `asdf`,
        id: 4, 
        subcategoryId: 1, 
        subcategory: { val: `a`, dimensionId: 1,categoryId:1 },
        dimension:{ val: `c` },
        category: { val: `b` }
      }
    });
  });
  test(`getAllTaskObjects should return null if there are no tasks`, () => {
    let returnedValue = taskSelectors.getAllTasksWithContent.resultFunc(
      { 1:{ val:`asdf`,subcategoryId: 1 } },//task ent
      [],//task res
      { 1: { val: `c` } },//dim ent
      { 1: { val: `b` } },//cat ent
      { 1: { val: `a`, dimensionId: 1,categoryId: 1 } }//sub ent
    );
    returnedValue = taskSelectors.getAllTaskObjects.resultFunc(returnedValue);
    expect(returnedValue).toBeNull();
  });
 

}); 