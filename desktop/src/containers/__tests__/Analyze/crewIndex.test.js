import React from 'react';
import { mount } from 'enzyme';

import { CrewIndex } from 'containers/Analyze/crewIndexContainer';
import domain from 'constants/domains';


const props =  {  
  selected: {},
  select: jest.fn(),
  crews: [{ id: 1 },{ id: 2 }],
  getAllCrews: jest.fn()
    .mockImplementationOnce(() => Promise.resolve()),
  setStatus: jest.fn()
};

const setup = overRides => {  
  return mount(<CrewIndex {...props} {...overRides}/>);    
};


describe('Crew Index Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();       
  });
  it('should generate a proper label on this.selectLabel', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel({ name: 'Josh' });
    expect(value).toEqual('Josh selected');
  });
  it('should call props.select on this.select', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.select({ id: 1 });
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(domain.CREW,{ id: 1 });
  });
});