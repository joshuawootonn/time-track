import { modalActionTypes } from 'constants/actionTypeConstants';

export const modalInitialState = {
  modalType: null,
  modalProps: {}
};

export default (state = modalInitialState, action) => {
  switch (action.type) {
  case modalActionTypes.SHOW_MODAL:
    return {
      modalType: action.modalType,
      modalProps: action.modalProps
    };
  case modalActionTypes.HIDE_MODAL:
    return modalInitialState;
  default:
    return state;
  }
};