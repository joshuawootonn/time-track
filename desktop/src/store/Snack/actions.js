import { snackActionTypes } from 'constants/actionTypeConstants';

export const openSnack = (type, message) => {
  return {
    type: snackActionTypes.SHOW_SNACK,
    snackType: type,
    snackMessage: message
  };
};
export const closeSnack = () => {
  return { type: snackActionTypes.HIDE_SNACK };
};
