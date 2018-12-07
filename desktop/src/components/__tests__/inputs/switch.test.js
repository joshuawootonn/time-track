import React from 'react';
import { mount } from 'enzyme';

import { Switch } from 'components/inputs/Switch/switch';
import SwitchHOC from 'components/inputs/Switch';

const props =  {  
  form:{
    errors: {},
    setFieldValue: jest.fn()
  },
  className: 'class',
  label: 'label',
  disabled: true
};

const setup = overRides => {  
  return mount(<Switch {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return mount(<SwitchHOC {...props} {...overRides}/>);
};

describe('Switch Input', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();   
  }); 
});