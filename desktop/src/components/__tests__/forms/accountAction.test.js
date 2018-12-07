import React from 'react';
import { shallow } from 'enzyme';

import { AccountAction } from 'components/forms/AccountAction/accountAction';
import AccountActionHOC from 'components/forms/AccountAction';

const props = {  
  classes: {},
  back: jest.fn(),
  clockIn: jest.fn(),
  isWorking: 0,
  clockOut: jest.fn(),
  export: jest.fn(),
  analyze: jest.fn(),
  type: 'type'
};

const setup = overRides => {  
  return shallow(<AccountAction {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<AccountActionHOC {...props} {...overRides}/>);
};

describe('Account Action Component', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when isWorking is false', () => {
    const wrapper = setup({ isWorking: 1 });
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when type === authorityConstants.ADMIN', () => {
    const wrapper = setup({ type: 'admin' });
    expect(wrapper).toMatchSnapshot();
  });
});