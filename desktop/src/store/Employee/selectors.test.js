import { employeeSelectors } from 'store/selectors';
import { initialState as analyzeInitialState } from 'store/Analyze/reducers';
import { initialState as employeeInitialState } from 'store/Employee/reducers';

describe(`Employee Selectors`, () => {
  test(`should have three basic selectors`, () => {
    employeeSelectors.getEmployeesFromEntities({ entities: { employees: {} } });
    employeeSelectors.getEmployeesFromResults({ results: { employees: [] } });
    employeeSelectors.getEmployeeFromState({ employee: {} });
  });
  test(`getAllEmployees should return null for results.size === 0`, () => {
    let returnedValue = employeeSelectors.getAllEmployees.resultFunc({}, null);
    expect(returnedValue).toBeNull();
    returnedValue = employeeSelectors.getAllEmployees.resultFunc({}, []);
    expect(returnedValue).toBeNull();
  });
  test(`getAllEmployees should return a mapped version of results for valid entities and results`, () => {
    const returnedValue = employeeSelectors.getAllEmployees.resultFunc(
      { 1: { val: `asdf` } },
      [1]
    );
    expect(returnedValue).toEqual([{ val: `asdf` }]);
  });
  test(`getSelectedEmployee should return {} for when analyze.employee -1  `, () => {
    const returnedValue = employeeSelectors.getSelectedEmployee.resultFunc(
      {},
      analyzeInitialState
    );
    expect(returnedValue).toEqual({});
  });
  test(`getSelectedEmployee should return selected authority when`, () => {
    const returnedValue = employeeSelectors.getSelectedEmployee.resultFunc(
      { 1: { value: `asdf` } },
      { ...analyzeInitialState, employee: 1 }
    );
    expect(returnedValue).toEqual({ value: `asdf` });
  });
  test(`getSelectedEmployee should return {} for when analyze.employee -1  `, () => {
    const returnedValue = employeeSelectors.getCurrentEmployee.resultFunc(
      {},
      employeeInitialState
    );
    expect(returnedValue).toEqual({});
  });
  test(`getSelectedEmployee should return selected authority when`, () => {
    const returnedValue = employeeSelectors.getCurrentEmployee.resultFunc(
      { 1: { value: `asdf` } },
      { ...employeeInitialState, current: { id: 1 } }
    );
    expect(returnedValue).toEqual({ value: `asdf` });
  });
  test(`getAllEmployees should return null for results.size === 0`, () => {
    let returnedValue = employeeSelectors.getAllEmployees.resultFunc(
      {},
      null,
      { 1: { val: `asdf` } },
      { 1: { val: `asdf` } }
    );
    expect(returnedValue).toBeNull();
    returnedValue = employeeSelectors.getAllEmployees.resultFunc(
      {},
      [],
      { 1: { val: `asdf` } },
      { 1: { val: `asdf` } }
    );
    expect(returnedValue).toBeNull();
  });
  test(`getAllEmployees should return a mapped version of results for valid entities and results`, () => {
    const returnedValue = employeeSelectors.getAllEmployees.resultFunc(
      { 1: { val: `asdf`, authorityId: 1, crewId: 1 } },
      [1],
      { 1: { val: `asdf` } },
      { 1: { val: `asdf` } }
    );
    expect(returnedValue).toEqual([
      {
        val: `asdf`,
        authorityId: 1,
        authority: { val: `asdf` },
        crewId: 1,
        crew: { val: `asdf` }
      }
    ]);
  });
});
