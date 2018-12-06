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

const setup = () => {  
  return shallow(<AccountAction {...props} />);    
};

const setupHOC = () => {
  return shallow(<AccountActionHOC {...props} />);
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
});