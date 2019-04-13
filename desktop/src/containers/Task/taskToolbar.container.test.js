import React from 'react';
import { mount } from 'enzyme';

import { TaskToolbar } from 'containers/Task/taskToolbar.container';

import domain from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';
import { TASK_MOCK } from 'constants/modelMocks';

const props =  {  
  selected: TASK_MOCK[0],
  select: jest.fn(),
  setStatus: jest.fn(),
  toggleTaskFilter: jest.fn(),
  taskFilterVisible: true
};

const setup = overRides => {  
  return mount(<TaskToolbar {...props} {...overRides}/>);    
};

describe(`Task Toolbar Container`, () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();       
  }); 
  it(`should generate a proper label on this.selectLabel`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel(props.selected);
    expect(value).toEqual(`1 selected`);
  });
  it(`should call props.setStatus on this.add`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(domain.TASK,analyzeStatus.ADDING);
  });
});