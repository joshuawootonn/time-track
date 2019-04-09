import { categorySelectors } from 'store/selectors';
import { initialState } from 'store/Analyze/reducers';

describe(`Category Selectors`, () => {
  test(`should have two basic selectors`, () => {
    categorySelectors.getCategoriesFromEntities({ entities: { categories:{} } });
    categorySelectors.getCategoriesFromResults({ results: { categories:[] } });
  });
  test(`getAllCategories should return null for results.size === 0`, () => {
    let returnedValue=categorySelectors.getAllCategories.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=categorySelectors.getAllCategories.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test(`getAllCategories should return a mapped version of results for valid entities and results`, () => {
    const returnedValue=categorySelectors.getAllCategories.resultFunc({ 1: { val: `asdf` } },[1]);
    expect(returnedValue).toEqual([{ val:`asdf` }]);
  });
  test(`getSelectedCategory should return {} for when analyze.category -1  `, () => {
    const returnedValue = categorySelectors.getSelectedCategory.resultFunc({},initialState);
    expect(returnedValue).toEqual({});
  });
  test(`getSelectedCategory should return selected category when`, () => {
    const returnedValue = categorySelectors.getSelectedCategory.resultFunc({ 1: { value: `asdf` } },{ ...initialState,category:1 });
    expect(returnedValue).toEqual({ value:`asdf` }); 
  });
  
});