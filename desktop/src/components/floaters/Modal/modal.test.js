import React from 'react';
import { shallow } from 'enzyme';

import { Modal } from 'components/floaters/Modal/modal';
import ModalHOC from 'components/floaters/Modal';

const props = {
  open: true,
  toggle: jest.fn(),
  children: <div>child</div>,
  classes: {}
};

const setup = () => {
  return shallow(<Modal {...props} />);
};

const setupHOC = () => {
  return shallow(<ModalHOC {...props} />);
};

describe(`Modal Component`, () => {
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
});
