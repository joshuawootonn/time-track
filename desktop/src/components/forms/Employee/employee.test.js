import React from 'react';
import { shallow } from 'enzyme';

import { Employee, EMPLOYEE_FORM_RESET_BUTTON_ID, EMPLOYEE_FORM_CLEAR_BUTTON_ID } from 'components/forms/Employee/employee';
import EmployeeHOC from 'components/forms/Employee';

import { AUTHORITY_MOCK, CREW_MOCK } from 'constants/modelMocks';

const props =  {  
  classes: {},
  crews: CREW_MOCK,
  authorities: AUTHORITY_MOCK,
  type: `edit`,
  removeEmployee: jest.fn(),
  editCrews: jest.fn(),
  editAuthorities: jest.fn(),
  label: `label`,
  isSubmitting: true,
  resetForm: jest.fn(),
  clearFilter: jest.fn(),
  initialValues: {},
  errors: {},
  touched: {}
};

const setup = overRides => {  
  return shallow(<Employee {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<EmployeeHOC {...props} {...overRides}/>);
};

describe(`Employee Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();  
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should call props.resetForm on #${EMPLOYEE_FORM_RESET_BUTTON_ID}`, () => {
    const wrapper = setup();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find(`#${EMPLOYEE_FORM_RESET_BUTTON_ID}`).first().simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
  it(`should only show the clear button when props.type === filter`, () => {
    const wrapperWithCorrectType = setup({ type: `filter` });
    expect(wrapperWithCorrectType.find(`#${EMPLOYEE_FORM_CLEAR_BUTTON_ID}`).length).toBe(1);
    const wrapperWithIncorrectType = setup();
    expect(wrapperWithIncorrectType.find(`#${EMPLOYEE_FORM_CLEAR_BUTTON_ID}`).length).toBe(0);
  });
  it(`should call props.resetForm and props.clearFilter on #${EMPLOYEE_FORM_CLEAR_BUTTON_ID}`, () => {
    const wrapper = setup({ type: `filter` });
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    expect(props.clearFilter).toHaveBeenCalledTimes(0);
    wrapper.find(`#${EMPLOYEE_FORM_CLEAR_BUTTON_ID}`).first().simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
    expect(props.clearFilter).toHaveBeenCalledTimes(1);
  });
});