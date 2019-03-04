import React from 'react';
import { shallow } from 'enzyme';

import ClockOut from 'scenes/Clock/clockOut';

const props =  {  
  type: 'type'
};

const setup = overRides => {  
  return shallow(<ClockOut {...props} {...overRides}/>);
};

describe('ClockOut Action Scene', () => {  
  it('should render correctly', () => {
    setup();        
  });  
});