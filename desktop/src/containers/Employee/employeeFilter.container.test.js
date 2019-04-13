import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { EmployeeFilter } from 'containers/Employee/employeeFilter.container';

import { analyzeStatus } from 'constants/analyze';
import { AUTHORITY_MOCK, CREW_MOCK, EMPLOYEE_MOCK } from 'constants/modelMocks';

const props =  {  
  selected: EMPLOYEE_MOCK[0],
  status: analyzeStatus.INIT,
  authorities: AUTHORITY_MOCK,
  crews: CREW_MOCK,
  updateFilter: jest.fn(),
  clearFilter: jest.fn(),
  toggleFilter: jest.fn(),
  employeeFilterVisible: true,
  employeeFilters: {
    crewId: -1,
    authorityId: -1
  }
  
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};


const setup = overRides => {  
  return mount(<EmployeeFilter {...props} {...overRides}/>);    
};


describe(`Employee Filter Container`, () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  }); 
  it(`should on return something is props.employeeFilterVisible === true`, () => {
    const wrapperWhenIsVisible = setup();
    expect(wrapperWhenIsVisible.html()).not.toBeNull();
    const wrapperWhenNotIsVisible = setup({ employeeFilterVisible: false });
    expect(wrapperWhenNotIsVisible.html()).toBeNull();
  });
  it(`should onSubmit call props.updateFilter, props.toggleFilter, and props.formikFunctions.resetForm `, () => {
    const values = { val: `asdf`,isEmployed: 0, isWorking: 0 };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.updateFilter).not.toHaveBeenCalled();
    expect(props.toggleFilter).not.toHaveBeenCalled();
    expect(formikFunctions.resetForm).not.toHaveBeenCalled();
    onSubmit(values,formikFunctions);
    expect(props.toggleFilter).toHaveBeenCalled();      
    expect(formikFunctions.resetForm).toHaveBeenCalled();      
    expect(props.updateFilter).toHaveBeenCalled();  
  });  
});