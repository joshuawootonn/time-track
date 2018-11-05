import { modalActionTypes } from 'constants/ActionTypes';

export const openModal = (type, props) => {
  return {
    type: modalActionTypes.SHOW_MODAL,
    modalType: type,
    modalProps: {
      ...props
    }
  };
};
export const closeModal = type => {
  return {
    type: modalActionTypes.HIDE_MODAL,
    modalType: type
  };
};