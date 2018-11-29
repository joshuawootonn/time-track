import analyzeReducer, { initialState } from 'store/Analyze/reducers';
import { analyzeActions } from 'store/actions';
import domains from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';
import { analyzeActionTypes } from 'constants/actionTypeConstants';

describe('Analyze Reducer', () => {
  it('should select domain by id', () => {
    const resultingState = analyzeReducer(initialState,analyzeActions.select(domains.EMPLOYEE,1));
    expect(resultingState.employee).toBe(1);
    expect(resultingState.employeeStatus).toBe(analyzeStatus.EDITING);
  });
  it('should deselect domain if selected id is selected again', () => {
    const intermediateState = analyzeReducer(initialState,analyzeActions.select(domains.EMPLOYEE,1));
    expect(intermediateState.employee).toBe(1);
    expect(intermediateState.employeeStatus).toBe(analyzeStatus.EDITING);
    const resultingState = analyzeReducer(intermediateState,analyzeActions.select(domains.EMPLOYEE,1));
    expect(resultingState.employee).toBe(-1);
    expect(resultingState.employeeStatus).toBe(analyzeStatus.INIT);
  });
  it('should set status of given domain', () => {
    const resultingState = analyzeReducer(initialState,analyzeActions.setStatus(domains.EMPLOYEE,analyzeStatus.ADDING));
    expect(resultingState.employeeStatus).toBe(analyzeStatus.ADDING);
  });
  it('should set selected to -1', () => {
    const existingState = { ...initialState, employee: 1 };    
    const resultingState = analyzeReducer(existingState,analyzeActions.deleteSelected(domains.EMPLOYEE));
    expect(resultingState.employee).toBe(-1);
  });  
  it('should return same state for invalid action', () => {
    const wackAction = { type: 'asdf',  domain:{ singular: 'employee' } };
    const resultingState = analyzeReducer(initialState,wackAction);
    expect(initialState).toBe(resultingState);    
  });
  it('should return same state for invalid select action', () => {
    const wackSelectAction = { type: analyzeActionTypes.SELECT, domain:{ singular:null } };   
    const resultingState = analyzeReducer(initialState,wackSelectAction);
    expect(initialState).toBe(resultingState);    
  });
  it('should return same state for invalid domain', () => {
    const wackAction = { type: 'asdf',  domain:{ singular: 'asdf' } };
    const resultingState = analyzeReducer(initialState,wackAction);
    expect(initialState).toBe(resultingState);    
  })
});