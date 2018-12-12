import React from 'react';
import { mount } from 'enzyme';

import Progress from 'components/helpers/Progress';

const props =  {  
  classes: {},
  fullPage: false,
  fullHeight: false,
  fullWidth: false,
  variant: 'linear'
};

const setup = overRides => {  
  return mount(<Progress {...props} {...overRides}/>);    
};

describe('Progress Component', () => {  
  it('should render correctly', () => {
    setup();        
  });  
});