import React from 'react';
import { shallow } from 'enzyme';

import AnalyzeHOC,{ Analyze } from 'scenes/Analyze/analyze';

const props =  {
  classes: {},
  history: {
    goBack: jest.fn()
  }
};

const setup = overRides => {  
  return shallow(<Analyze {...props} {...overRides}/>);
};

const setupHOC = overRides => {
  return shallow(<AnalyzeHOC {...props} {...overRides} />);
};

describe('Analyze Scene', () => {  
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
  it('should display different containers based on state.tabValue', () =>{
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(wrapper.state().tabValue).toEqual(1);
    instance.handleTabValueChange(null,2);
    expect(wrapper.state().tabValue).toEqual(2);
    instance.handleTabValueChange(null,0);
    expect(wrapper.state().tabValue).toEqual(0);
    instance.handleTabValueChange(null,3);
    expect(wrapper.state().tabValue).toEqual(3);
  });
  it('should call this.props.history.goBack() on this.back()', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.goBack).toHaveBeenCalledTimes(0);
    instance.back();
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  });
});