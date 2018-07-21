import {snack as snackActionTypes }from 'constants/ActionTypes';

export const modalInitialState = {
  modalType: null,
  modalProps: {}
}

export default (state = modalInitialState, action) => {
  switch (action.type) {
    case snackActionTypes.SHOW_SNACK:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case snackActionTypes.HIDE_SNACK:
      return modalInitialState;
    default:
      return state;
  }
}