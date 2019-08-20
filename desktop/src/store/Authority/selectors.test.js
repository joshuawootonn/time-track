import { authoritySelectors } from 'store/selectors';
import { initialState } from 'store/Analyze/reducers';

describe(`Authority Selectors`, () => {
  test(`should have two basic selectors`, () => {
    authoritySelectors.getAuthoritiesFromEntities({
      entities: { authorities: {} }
    });
    authoritySelectors.getAuthoritiesFromResults({
      results: { authorities: [] }
    });
  });
  test(`getAllAuthorities should return null for results.size === 0`, () => {
    let returnedValue = authoritySelectors.getAllAuthorities.resultFunc(
      {},
      null
    );
    expect(returnedValue).toBeNull();
    returnedValue = authoritySelectors.getAllAuthorities.resultFunc({}, []);
    expect(returnedValue).toBeNull();
  });
  test(`getAllAuthorities should return a mapped version of results for valid entities and results`, () => {
    const returnedValue = authoritySelectors.getAllAuthorities.resultFunc(
      { 1: { val: `asdf` } },
      [1]
    );
    expect(returnedValue).toEqual([{ val: `asdf` }]);
  });
  test(`getSelectedAuthority should return {} for when analyze.authority -1  `, () => {
    const returnedValue = authoritySelectors.getSelectedAuthority.resultFunc(
      {},
      initialState
    );
    expect(returnedValue).toEqual({});
  });
  test(`getSelectedAuthority should return selected authority when`, () => {
    const returnedValue = authoritySelectors.getSelectedAuthority.resultFunc(
      { 1: { value: `asdf` } },
      { ...initialState, authority: 1 }
    );
    expect(returnedValue).toEqual({ value: `asdf` });
  });
});
