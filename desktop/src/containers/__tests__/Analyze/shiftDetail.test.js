import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { ShiftDetail } from 'containers/Analyze/shiftDetailsContainer';
import { analyzeStatus } from 'constants/analyze';

const props =  {  
  selected:{ clockInDate:'2018-11-25T15:00:00.000Z',clockOutDate:null,employeeId:2,id:9,length:null,lunch:null,activities:[],employee:{ authorityId:1,crewId:1,firstName:'Joshua',id:2,isEmployed:1,isWorking:1,lastName:'Wootonn',pin:565656 } },
  projects:[{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' },{ date:'2018-11-09T06:00:00.000Z',id:2,isActive:1,name:'Project 1' },{ date:'2018-11-09T06:00:00.000Z',id:3,isActive:1,name:'Project 2' },{ date:'2018-11-10T06:00:00.000Z',id:4,isActive:1,name:'ASDASDF' }],
  projectTasks:[{ estimateTime:0,id:1,projectId:1,quantity:0,taskId:2,task:{ id:2,isActive:1,name:'6" Sidewalk',subcategoryId:1,subcategory:{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },category:{ id:2,type:'PCC' },dimension:{ id:1,type:'SF' } },project:{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' } },{ estimateTime:500,id:2,projectId:1,quantity:200,taskId:1,task:{ id:1,isActive:1,name:'7" Sidewalk',subcategoryId:1,subcategory:{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },category:{ id:2,type:'PCC' },dimension:{ id:1,type:'SF' } },project:{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' } },{ estimateTime:1,id:9,projectId:3,quantity:1,taskId:2,task:{ id:2,isActive:1,name:'6" Sidewalk',subcategoryId:1,subcategory:{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },category:{ id:2,type:'PCC' },dimension:{ id:1,type:'SF' } },project:{ date:'2018-11-09T06:00:00.000Z',id:3,isActive:1,name:'Project 2' } }],
  employees:[{ authorityId:1,crewId:1,firstName:'Joshua',id:2,isEmployed:1,isWorking:1,lastName:'Wootonn',pin:565656,authority:{ id:1,type:'Admin' },crew:{ id:1,name:'Crew 3' } },{ authorityId:1,crewId:1,firstName:'Jay',id:1,isEmployed:1,isWorking:0,lastName:'Simon',pin:234234,authority:{ id:1,type:'Admin' },crew:{ id:1,name:'Crew 3' } },{ authorityId:1,crewId:1,firstName:'adfsadfs',id:3,isEmployed:1,isWorking:0,lastName:'adsfadsf',pin:234545,authority:{ id:1,type:'Admin' },crew:{ id:1,name:'Crew 3' } }],
  status: analyzeStatus.INIT,
  updateShift: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createShift: jest.fn()
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
  return mount(<ShiftDetail {...props} {...overRides}/>);    
};


describe('Shift Detail Container', () => {  
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
  it('should call removeShift on this.removeShift', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.removeShift).toHaveBeenCalledTimes(0);
    instance.removeShift();
    expect(props.removeShift).toHaveBeenCalledTimes(1);
  });
  it('should test the onSubmit calls updateShift and onResolve it should resetForm and  setStatus to {success: true} ', () => {
    const values = { id: 1, name: 'name', subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
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
  it('should test the onSubmit calls updateShift and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}', () => {
    const values = { id: 1, name: 'name', subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');

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

  it('should test the onSubmit calls createShift and onResolve it should resetForm and  setStatus to {success: true} ', () => {
    const values = { id: 1, name: 'name', subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.createShift).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions);    
    expect(props.createShift).toHaveBeenCalledTimes(1);    
    expect(props.createShift).toHaveBeenCalledWith(values);
  });
  it('should test the onSubmit calls createShift and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}', () => {
    const values = { id: 1, name: 'name', subcategoryId: 1, isActive: 1, activities: {} };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
        
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