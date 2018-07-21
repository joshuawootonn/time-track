import {snack as snackActionTypes }from 'constants/ActionTypes';

export const modalInitialState = {
  snackType: null,
  snackProps: {}
}

export default (state = modalInitialState, action) => {
  switch (action.type) {
    case snackActionTypes.SHOW_SNACK:
      return {
        snackType: action.snackType,
        snackProps: action.snackProps
      };
    case snackActionTypes.HIDE_SNACK:
      return modalInitialState;
    default:
      return state;
  }
}