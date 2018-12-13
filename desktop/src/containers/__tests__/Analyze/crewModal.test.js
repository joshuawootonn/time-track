import React from 'react';
import { shallow } from 'enzyme';

import CrewModalHOC, { CrewModal } from 'containers/Analyze/crewModalContainer';

const props =  {  
  classes: {}
};

const setup = overRides => {  
  return shallow(<CrewModal {...props} {...overRides}/>);    
};

const setupHOC = overRides => {  
  return shallow(<CrewModalHOC {...props} {...overRides}/>);    
};


describe('Crew Modal Container', () => {  
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