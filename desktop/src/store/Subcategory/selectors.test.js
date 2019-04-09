import { subcategorySelectors } from 'store/selectors';
import { initialState } from 'store/Analyze/reducers';

describe(`Subcategory Selectors`, () => {
  test(`should have two basic selectors`, () => {
    subcategorySelectors.getSubcategoriesFromEntities({ entities: { subcategories:{} } });
    subcategorySelectors.getSubcategoriesFromResults({ results: { subcategories:[] } });
  });
  test(`getAllSubcategories should return null for results.size === 0`, () => {
    let returnedValue=subcategorySelectors.getAllSubcategories.resultFunc({},null);
    expect(returnedValue).toBeNull();    
    returnedValue=subcategorySelectors.getAllSubcategories.resultFunc({},[]);
    expect(returnedValue).toBeNull();
  });
  test(`getAllSubcategories should return a mapped version of results for valid entities and results`, () => {
    const returnedValue=subcategorySelectors.getAllSubcategories.resultFunc({ 1: { val: `asdf` } },[1]);
    expect(returnedValue).toEqual([{ val:`asdf` }]);
  });
  test(`getSelectedSubcategory should return {} for when analyze.authority -1  `, () => {
    const returnedValue = subcategorySelectors.getSelectedSubcategory.resultFunc({},initialState);
    expect(returnedValue).toEqual({});
  });
  test(`getSelectedSubcategory should return selected authority when`, () => {
    const returnedValue = subcategorySelectors.getSelectedSubcategory.resultFunc({ 1: { value: `asdf` } },{ ...initialState,subcategory:1 });
    expect(returnedValue).toEqual({ value:`asdf` }); 
  });  
});