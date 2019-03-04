import { modalActionTypes } from 'constants/actionTypeConstants';

export const initialState = {
  modalType: null,
  modalProps: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
  case modalActionTypes.SHOW_MODAL:
    return {
      modalType: action.modalType,
      modalProps: action.modalProps
    };
  case modalActionTypes.HIDE_MODAL:
    return initialState;
  default:
    return state;
  }
};