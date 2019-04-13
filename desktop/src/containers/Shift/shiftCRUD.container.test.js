import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { ShiftCRUD } from 'containers/Shift/shiftCRUD.container';

import { analyzeStatus } from 'constants/analyze';
import { EMPLOYEE_MOCK, PROJECT_MOCK, PROJECT_TASK_MOCK, INCOMPLETE_SHIFT_MOCK } from 'constants/modelMocks';
import * as formConstants from 'constants/formTypes';

const props =  {  
  selected:INCOMPLETE_SHIFT_MOCK[0],
  projects:PROJECT_MOCK,
  projectTasks:PROJECT_TASK_MOCK,
  employees: EMPLOYEE_MOCK,
  status: analyzeStatus.INIT,
  updateShift: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createShift: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  updateHalfShift: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createHalfShift: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  removeShift: jest.fn(),
  editCategoriesModal: jest.fn()
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};


const setup = overRides => {  
  return mount(<ShiftCRUD {...props} {...overRides}/>);    
};


describe(`Shift CRUD Container`, () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly if props.status === INIT`, () => {
    setup();
  });
  it(`should render correctly if props.status === EDITING and state.editingExtent === formConstants.HALF_SHIFT`, () => {
    const wrapper = setup({ status: analyzeStatus.EDITING });       
    wrapper.setState({ [`${analyzeStatus.EDITING}Extent`]: formConstants.HALF_SHIFT });      
    wrapper.update(); 
  });
  it(`should render correctly if props.status === EDITING and state.editingExtent === formConstants.FULL_SHIFT`, () => {
    const wrapper = setup({ status: analyzeStatus.EDITING });   
    wrapper.setState({ [`${analyzeStatus.EDITING}Extent`]: formConstants.FULL_SHIFT });       
    wrapper.update(); 
  });  
  it(`should render correctly if props.status === ADDING and state.editingExtent === formConstants.HALF_SHIFT`, () => {
    const wrapper = setup({ status: analyzeStatus.ADDING });
    wrapper.setState({ [`${analyzeStatus.ADDING}Extent`]: formConstants.HALF_SHIFT });      
    wrapper.update(); 
  });
  it(`should render correctly if props.status === ADDING and state.editingExtent === formConstants.FULL_SHIFT`, () => {
    const wrapper = setup({ status: analyzeStatus.ADDING });
    wrapper.setState({ [`${analyzeStatus.ADDING}Extent`]: formConstants.FULL_SHIFT });      
    wrapper.update(); 
  });



  it(`should call removeShift on this.removeShift`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.removeShift).toHaveBeenCalledTimes(0);
    instance.removeShift();
    expect(props.removeShift).toHaveBeenCalledTimes(1);
  });

  it(`should call updateExtent on this.updateExtent`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(wrapper.state(`${analyzeStatus.EDITING}Extent`)).toEqual(formConstants.FULL_SHIFT);
    instance.updateExtent(analyzeStatus.EDITING,formConstants.HALF_SHIFT);
    expect(wrapper.state(`${analyzeStatus.EDITING}Extent`)).toEqual(formConstants.HALF_SHIFT);
  });

  // HALF SHIFT - EDIT
  it(`should test the onSubmit calls updateHalfShift and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.EDITING });    
    wrapper.setState({ [`${analyzeStatus.EDITING}Extent`]: formConstants.HALF_SHIFT });  
    wrapper.update();
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.updateHalfShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);      
      expect(props.updateHalfShift).toHaveBeenCalledTimes(1);
      expect(props.updateHalfShift).toHaveBeenCalledWith(values);
    });
  });
  it(`should test the onSubmit calls updateHalfShift and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    wrapper.setState({ [`${analyzeStatus.EDITING}Extent`]: formConstants.HALF_SHIFT });  
    wrapper.update();
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);

    expect(props.updateHalfShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);  
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.updateHalfShift).toHaveBeenCalledTimes(1);
      expect(props.updateHalfShift).toHaveBeenCalledWith(values);
    });
  });

  // FULL SHIFT - EDIT
  it(`should test the onSubmit calls updateShift and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.updateShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);      
      expect(props.updateShift).toHaveBeenCalledTimes(1);
      expect(props.updateShift).toHaveBeenCalledWith(values);
    });
  });
  it(`should test the onSubmit calls updateShift and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);

    expect(props.updateShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);  
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.updateShift).toHaveBeenCalledTimes(1);
      expect(props.updateShift).toHaveBeenCalledWith(values);
    });
  });
  
  // HALF SHIFT - ADD
  it(`should test the onSubmit calls createHalfShift and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    wrapper.setState({ [`${analyzeStatus.ADDING }Extent`]: formConstants.HALF_SHIFT });  
    wrapper.update();
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.createHalfShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions);    
    expect(props.createHalfShift).toHaveBeenCalledTimes(1);    
    expect(props.createHalfShift).toHaveBeenCalledWith(values);
  });
  it(`should test the onSubmit calls createHalfShift and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    wrapper.setState({ [`${analyzeStatus.ADDING}Extent`]: formConstants.HALF_SHIFT });  
    wrapper.update();
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
        
    expect(props.createHalfShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0); 
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.createHalfShift).toHaveBeenCalledTimes(1);
      expect(props.createHalfShift).toHaveBeenCalledWith(values);
    });
  });

  // FULL SHIFT - ADD
  it(`should test the onSubmit calls createShift and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
    
    expect(props.createShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions);    
    expect(props.createShift).toHaveBeenCalledTimes(1);    
    expect(props.createShift).toHaveBeenCalledWith(values);
  });
  it(`should test the onSubmit calls createShift and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { id: 1, name: `name`, subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop(`onSubmit`);
        
    expect(props.createShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0); 
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.createShift).toHaveBeenCalledTimes(1);
      expect(props.createShift).toHaveBeenCalledWith(values);
    });
  });
});