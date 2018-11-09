import { snackActionTypes } from 'constants/actionTypeConstants';

export const modalInitialState = {
  snackType: null,
  snackMessage: null
};

export default (state = modalInitialState, action) => {
  switch (action.type) {
  case snackActionTypes.SHOW_SNACK:
    return {
      snackType: action.snackType,
      snackMessage: action.snackMessage
    };
  case snackActionTypes.HIDE_SNACK:
    return modalInitialState;
  default:
    return state;
  }
};
