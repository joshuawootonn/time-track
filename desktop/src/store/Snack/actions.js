import {snack as snackActionTypes} from 'constants/ActionTypes';

export const openSnack = (type, props) => {
  return {
    type: snackActionTypes.SHOW_SNACK,
    modalType: type,
    modalProps: {
      ...props
    }
  }
}
export const closeSnack = (type) => {
  return {
    type: snackActionTypes.HIDE_SNACK,
    modalType: type
  }
}