import React from 'react';
import { mount } from 'enzyme';

import { CrewDetail } from 'containers/Analyze/crewDetailContainer';

const props =  {  
  selected: {},
  status: 'editing',
  updateCrew: jest.fn()
};


const setup = overRides => {  
  return mount(<CrewDetail {...props} {...overRides}/>);    
};

// const setupHOC = overRides => {  
//   return shallow(<CrewDetailHOC {...props} {...overRides}/>);
// };

describe('Crew Detail Container', () => {  
  it('should render correctly', () => {
    setup();
        
  });
  // it('should render correctly withStyles', () => {
  //   setupHOC();
  //   
  // });
 
});