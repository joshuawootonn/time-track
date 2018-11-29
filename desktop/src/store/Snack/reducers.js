import { snackActionTypes } from 'constants/actionTypeConstants';

export const initialState = {
  snackType: null,
  snackMessage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case snackActionTypes.SHOW_SNACK:
    return {
      snackType: action.snackType,
      snackMessage: action.snackMessage
    };
  case snackActionTypes.HIDE_SNACK:
    return initialState;
  default:
    return state;
  }
};
