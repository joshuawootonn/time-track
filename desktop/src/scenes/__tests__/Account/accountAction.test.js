import React from 'react';
import { shallow } from 'enzyme';

import AccountAction from 'scenes/Account/accountAction';
const props =  {  
  type: 'type'
};

const setup = overRides => {  
  return shallow(<AccountAction {...props} {...overRides}/>);
};

describe('Account Action Scene', () => {  
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });  
});