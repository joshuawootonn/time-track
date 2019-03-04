import React from 'react';
import { mount } from 'enzyme';

import { ProjectIndex } from 'containers/Analyze/projectIndexContainer';
import domain from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';
import Progress from 'components/helpers/Progress';


const props =  {  
  selected: { date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' },
  select: jest.fn(),
  projects:[{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' },{ date:'2018-11-09T06:00:00.000Z',id:2,isActive:1,name:'Project 1' },{ date:'2018-11-09T06:00:00.000Z',id:3,isActive:1,name:'Project 2' },{ date:'2018-11-10T06:00:00.000Z',id:4,isActive:1,name:'ASDASDF' }],
  setStatus: jest.fn(),
  getAllProjects: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
};

const setup = overRides => {  
  return mount(<ProjectIndex {...props} {...overRides}/>);    
};


describe('Project Index Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();       
  });
  it('should render loader if projects falsey', () => {
    const wrapper = setup({ projects: null });
    expect(wrapper.find(Progress).length).toBeGreaterThan(0);
  });
  it('should generate a proper label on this.selectLabel', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel(props.selected);
    expect(value).toEqual('Project 3 selected');
  });
  it('should call props.select on this.select', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.select({ id: 1 });
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(domain.PROJECT,{ id: 1 });
  });
  it('should call props.setStatus on this.add', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(domain.PROJECT,analyzeStatus.ADDING);
  });
});