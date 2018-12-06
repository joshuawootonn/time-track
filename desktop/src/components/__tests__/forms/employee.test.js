import React from 'react';
import { shallow } from 'enzyme';

import { Employee } from 'components/forms/Employee/employee';
import EmployeeHOC from 'components/forms/Employee';

const props =  {  
  classes: {},
  crews: [{},{}],
  authorities: [{},{}],
  type: 'edit',
  removeEmployee: jest.fn(),
  editCrews: jest.fn(),
  editAuthorities: jest.fn(),
  label: 'label',
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  errors: {}
};

const setup = overRides => {  
  return shallow(<Employee {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<EmployeeHOC {...props} {...overRides}/>);
};

describe.skip('Employee Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call resetForm on employee-reset-button', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.resetForm = jest.fn();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find('#employee-reset-button').first().simulate('click');
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
});