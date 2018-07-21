import {snack as snackActionTypes} from 'constants/ActionTypes';

export const openSnack = (type, message) => {
  return {
    type: snackActionTypes.SHOW_SNACK,
    snackType: type,
    snackMessage: message
  }
}
export const closeSnack = (type) => {
  return {
    type: snackActionTypes.HIDE_SNACK
  }
}