import snackReducer, { initialState } from 'store/Snack/reducers';
import {  snackActions } from 'store/actions';
import * as status from 'constants/status';

describe('Snack Reducer', () => {
  it('openSnack should set the snackType to the first param and the snackMessage to the second param', () => {
    const resultingState = snackReducer(initialState,snackActions.openSnack(status.SUCCESS,'asdf'));
    expect(resultingState.snackType).toBe(status.SUCCESS);
    expect(resultingState.snackMessage).toEqual('asdf');
  });
  it('closeSnack should set snackMessage to {} for null param', () => {
    const resultingState = snackReducer(initialState,snackActions.closeSnack());
    expect(resultingState.snackType).toBeNull();
    expect(resultingState.snackMessage).toBeNull();
  });
  it('should return same state for invalid action', () => {
    const wackAction = { type: 'asdf' };
    const resultingState = snackReducer(initialState,wackAction);
    expect(resultingState).toEqual(initialState);
  }); 
});