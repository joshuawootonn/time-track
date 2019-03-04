import React from 'react';
import { shallow } from 'enzyme';

import AccountSignin from 'scenes/Account/accountSignin';

const props =  {};

const setup = overRides => {  
  return shallow(<AccountSignin {...props} {...overRides}/>);
};
describe('Account Signin Scene', () => {  
  it('should render correctly', () => {
    setup();        
  });  
});