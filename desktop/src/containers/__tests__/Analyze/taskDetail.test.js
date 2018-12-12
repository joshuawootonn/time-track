import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { TaskDetail } from 'containers/Analyze/taskDetailContainer';
import { analyzeStatus } from 'constants/analyze';

const props =  {  
  selected: {
    id: 1,
    isActive: 1,
    name: '7" Sidewalk',
    subcategoryId: 1,
    categoryId: 2
  },
  status: analyzeStatus.INIT,
  categories:[{ id:1,type:'Setup' },{ id:2,type:'PCC' },{ id:3,type:'Earthwork' }],
  subcategories:[{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },{ categoryId:2,id:2,type:'Pavement',dimensionId:1 }],
  updateTask: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createTask: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  removeTask: jest.fn(),
  editCategoriesModal: jest.fn()
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};


const setup = overRides => {  
  return mount(<TaskDetail {...props} {...overRides}/>);    
};


describe('Task Detail Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly if status === INIT', () => {
    setup();
  });
  it('should render correctly if status === EDITING', () => {
    setup({ status: analyzeStatus.EDITING });       
  });  
  it('should render correctly if status === ADDING', () => {
    setup({ status: analyzeStatus.ADDING });
  });
  it('should call removeTask on this.removeTask', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.removeTask).toHaveBeenCalledTimes(0);
    instance.removeTask();
    expect(props.removeTask).toHaveBeenCalledTimes(1);
  });
  it('should test the onSubmit calls updateTask and onResolve it should resetForm and  setStatus to {success: true} ', () => {
    const values = { id: 1, name: 'name', subcategoryId: 1, isActive: 1 };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.updateTask).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);      
      expect(props.updateTask).toHaveBeenCalledTimes(1);
      expect(props.updateTask).toHaveBeenCalledWith(values);
    });
  });
  it('should test the onSubmit calls updateTask and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}', () => {
    const values = { id: 1, name: 'name', subcategoryId: 1, isActive: 1 };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');

    expect(props.updateTask).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);  
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.updateTask).toHaveBeenCalledTimes(1);
      expect(props.updateTask).toHaveBeenCalledWith(values);
    });
  });

  it('should test the onSubmit calls createTask and onResolve it should resetForm and  setStatus to {success: true} ', () => {
    const values = { name: 'name', subcategoryId: 1, isActive: 1 };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.createTask).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions);    
    expect(props.createTask).toHaveBeenCalledTimes(1);    
    expect(props.createTask).toHaveBeenCalledWith(values);
  });
  it('should test the onSubmit calls createTask and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}', () => {
    const values = { name: 'name', subcategoryId: 1, isActive: 1 };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
        
    expect(props.createTask).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);      
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0); 
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);      
      expect(props.createTask).toHaveBeenCalledTimes(1);
      expect(props.createTask).toHaveBeenCalledWith(values);
    });
  });
});