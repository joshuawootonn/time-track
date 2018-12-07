import React from 'react';
import { shallow } from 'enzyme';

import { Password } from 'components/inputs/Password/password';
import PasswordHOC from 'components/inputs/Password';

const props =  {  
  form:{
    errors: {}
  },
  field: {
    name: 'name',
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
  return shallow(<Password {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<PasswordHOC {...props} {...overRides}/>);
};

describe('Password Input', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();   
  }); 
});