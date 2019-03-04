import modalReducer, { initialState } from 'store/Modal/reducers';
import {  modalActions } from 'store/actions';
import * as status from 'constants/status';

describe('Modal Reducer', () => {
  it('openModal should set the modalType to the first param and the modalProps to the second param', () => {
    const resultingState = modalReducer(initialState,modalActions.openModal(status.SUCCESS,{ val: 'asdf' }));
    expect(resultingState.modalType).toBe(status.SUCCESS);
    expect(resultingState.modalProps).toEqual({ val: 'asdf' });
  });
  it('openModal should set modalProps to {} for null param', () => {
    const resultingState = modalReducer(initialState,modalActions.openModal(status.SUCCESS,null));
    expect(resultingState.modalType).toBe(status.SUCCESS);
    expect(resultingState.modalProps).toEqual({});
  });
  it('closeModal should set modalType to NULL and modalProps to {}', () => {
    const resultingState = modalReducer(initialState,modalActions.closeModal());
    expect(resultingState.modalType).toBeNull();
    expect(resultingState.modalProps).toEqual({});
  });
  it('should return same state for invalid action', () => {
    const wackAction = { type: 'asdf' };
    const resultingState = modalReducer(initialState,wackAction);
    expect(resultingState).toEqual(initialState);
  }); 
});