import {snack as snackActionTypes} from 'constants/ActionTypes';

export const openSnack = (type, props) => {
  return {
    type: snackActionTypes.SHOW_SNACK,
    snackType: type,
    snackProps: {
      ...props
    }
  }
}
export const closeSnack = (type) => {
  return {
    type: snackActionTypes.HIDE_SNACK,
    snackType: type
  }
}