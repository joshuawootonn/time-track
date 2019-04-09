import React from 'react';
import { mount } from 'enzyme';

import { TextField } from 'components/inputs/TextField/textField';
import TextFieldHOC from 'components/inputs/TextField';

const props =  {  
  form:{
    errors: {}
  },
  field: {
    name: `name`
  },
  label: `label`,
  labelProps: {},
  formControlProps: {},
  margin: `normal`,
  classes: {},
  helper: `normal`,
  fullWidth: true
};

const setup = overRides => {  
  return mount(<TextField {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return mount(<TextFieldHOC {...props} {...overRides}/>);
};

describe(`TextField Input`, () => {
  it(`should render correctly`, () => {
    setup();        
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();       
  }); 
  it(`should render no helper text when helper="none"`, () => {
    setup({ helper: `none` });        
  });
});