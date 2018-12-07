import React from 'react';
import { shallow,mount } from 'enzyme';

import CrewDetailHOC, { CrewDetail } from 'containers/Analyze/crewDetailContainer';

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
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  // it('should render correctly withStyles', () => {
  //   const wrapper = setupHOC();
  //   expect(wrapper).toMatchSnapshot();
  // });
 
});