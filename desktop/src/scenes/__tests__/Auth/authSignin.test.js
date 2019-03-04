import React from 'react';
import { shallow } from 'enzyme';

import AuthSignin from 'scenes/Auth/authSignin';

const props =  { };

const setup = overRides => {  
  return shallow(<AuthSignin {...props} {...overRides}/>);
};

describe('Auth Signin Scene', () => {  
  it('should render correctly', () => {
    setup();        
  });  
});