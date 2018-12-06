import React from 'react';
import { shallow } from 'enzyme';
import {Close} from '@material-ui/icons'

import { Snack } from 'components/floaters/Snack/snack';
import SnackHOC from 'components/floaters/Snack';

const props = {
  onClose: jest.fn(),
  position: {},
  type: 'type',
  icon: <Close />,
  message: 'message',
  classes: {}
};

const setup = () => {  
  return shallow(<Snack {...props} />);    
};

const setupHOC = () => {
  return shallow(<SnackHOC {...props} />);
};

describe('Snack Components', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
});