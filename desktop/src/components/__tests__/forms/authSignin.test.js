import React from 'react';
import { shallow } from 'enzyme';

import { AuthSignin } from 'components/forms/AuthSignin/authSignin';
import AuthSigninHOC from 'components/forms/AuthSignin';

const props =  {  
  classes: {},
  isSubmitting: true,
  errors: {}
};

const setup = overRides => {  
  return shallow(<AuthSignin {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<AuthSigninHOC {...props} {...overRides}/>);
};

describe('Auth Signin Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();  
  });
  it('should render correctly withStyles', () => {
    setupHOC();
  });
});