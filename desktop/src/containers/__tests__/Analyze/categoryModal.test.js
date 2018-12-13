import React from 'react';
import { shallow } from 'enzyme';

import CategoryModalHOC, { CategoryModal } from 'containers/Analyze/categoryModalContainer';

const props =  {  
  classes: {}
};

const setup = overRides => {  
  return shallow(<CategoryModal {...props} {...overRides}/>);    
};

const setupHOC = overRides => {  
  return shallow(<CategoryModalHOC {...props} {...overRides}/>);    
};


describe('Category Modal Container', () => {  
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