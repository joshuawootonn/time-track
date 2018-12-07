import React from 'react';
import { mount } from 'enzyme';

import { TextField } from 'components/inputs/TextField/textField';
import TextFieldHOC from 'components/inputs/TextField';

const props =  {  
  form:{
    errors: {}
  },
  field: {
    name: 'name'
  },
  label: 'label',
  labelProps: {},
  formControlProps: {},
  margin: 'normal',
  classes: {},
  helper: 'normal',
  fullWidth: true
};

const setup = overRides => {  
  return mount(<TextField {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return mount(<TextFieldHOC {...props} {...overRides}/>);
};

describe('TextField Input', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();   
  }); 
  it('should render no helper text when helper="none"', () => {
    const wrapper = setup({ helper: 'none' });
    expect(wrapper).toMatchSnapshot();    
  });
});