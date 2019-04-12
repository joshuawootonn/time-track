import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { EmployeeCRUD } from 'containers/Employee/employeeCRUDContainer';

import { analyzeStatus } from 'constants/analyze';

const props =  {  
  selected: { id: 1,isEmployed: 0, isWorking: 1, authorityId: 1, crewId: 1 },
  status: analyzeStatus.INIT,
  authorities: [{ id: 1 },{ id: 2 }],
  crews: [{ id: 1 },{ id: 2 }],
  updateEmployee: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createEmployee: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  removeEmployee: jest.fn(),
  editAuthoritiesModal: jest.fn(),
  editCrewsModal: jest.fn()
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};


const setup = overRides => {  
  return mount(<EmployeeCRUD {...props} {...overRides}/>);    
};


describe(`Employee Detail Container`, () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly if status === INIT`, () => {
    setup();
  });
  it(`should render correctly if status === EDITING`, () => {
    setup({ status: analyzeStatus.EDITING });       
  });  
  it(`should render correctly if status === ADDING`, () => {
    setup({ status: analyzeStatus.ADDING });
  });
  it(`should call removeEmployee on this.removeEmployee`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.removeEmployee).toHaveBeenCalledTimes(0);
    instance.removeEmployee();
    expect(props.removeEmployee).toHaveBeenCalledTimes(1);
  });
  it(`should test the onSubmit calls updateEmployee and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { val: `asdf`,isEmployed: 0, isWorking: 0 };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.updateEmployee).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);      
      expect(props.updateEmployee).toHaveBeenCalledTimes(1);
      expect(props.updateEmployee).toHaveBeenCalledWith(values);
    });
  });
  it(`should test the onSubmit calls updateEmployee and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { val: `asdf`,isEmployed: 0, isWorking: 0 };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);

    expect(props.updateEmployee).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);  
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.updateEmployee).toHaveBeenCalledTimes(1);
      expect(props.updateEmployee).toHaveBeenCalledWith(values);
    });
  });

  it(`should test the onSubmit calls createEmployee and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { val: `asdf`,isEmployed: 0, isWorking: 0 };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.createEmployee).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions);    
    expect(props.createEmployee).toHaveBeenCalledTimes(1);    
    expect(props.createEmployee).toHaveBeenCalledWith(values);
  });
  it(`should test the onSubmit calls createEmployee and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { val: `asdf`,isEmployed: 0, isWorking: 0 };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
        
    expect(props.createEmployee).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0); 
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.createEmployee).toHaveBeenCalledTimes(1);
      expect(props.createEmployee).toHaveBeenCalledWith(values);
    });
  });
});