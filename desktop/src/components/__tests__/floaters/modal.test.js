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

describe('Modal Components', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
});