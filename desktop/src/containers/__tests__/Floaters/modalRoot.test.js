import React from 'react';
import { shallow } from 'enzyme';

import { ModalRoot } from 'containers/Floaters/modalRootContainer';
import { authorityActionTypes } from 'constants/actionTypeConstants';

const props = {
  modalType: authorityActionTypes.EDIT_AUTHORITIES_MODAL,
  modalProps: {},
  closeModal: jest.fn()
};

const setup = overRides => {
  return shallow(<ModalRoot {...props} {...overRides} />);
};

describe(`Modal Root Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should return null when modal type is null`, () => {
    const wrapper = setup({ modalType: null });
    const instance = wrapper.instance();
    expect(instance.render()).toBeNull();
  });
  it(`should call props.closeModal on this.toggleModal`, () => {
    const wrapper = setup({ modalType: null });
    const instance = wrapper.instance();
    expect(props.closeModal).not.toHaveBeenCalled();
    instance.toggleModal();
    expect(props.closeModal).toHaveBeenCalled();
  });
});
