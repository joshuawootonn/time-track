import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { ClockOut } from 'containers/Clock/clockOutContainer';
import Progress from 'components/helpers/Progress';

const props =  {  
  currentShift:{ clockInDate:'2018-11-25T15:00:00.000Z',clockOutDate:null,employeeId:2,id:9,length:null,lunch:null,activities:[],employee:{ authorityId:1,crewId:1,firstName:'Joshua',id:2,isEmployed:1,isWorking:1,lastName:'Wootonn',pin:565656 } },
  projects:[{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' },{ date:'2018-11-09T06:00:00.000Z',id:2,isActive:1,name:'Project 1' },{ date:'2018-11-09T06:00:00.000Z',id:3,isActive:1,name:'Project 2' },{ date:'2018-11-10T06:00:00.000Z',id:4,isActive:1,name:'ASDASDF' }],
  projectTasks:[{ estimateTime:0,id:1,projectId:1,quantity:0,taskId:2,task:{ id:2,isActive:1,name:'6" Sidewalk',subcategoryId:1,subcategory:{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },category:{ id:2,type:'PCC' },dimension:{ id:1,type:'SF' } },project:{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' } },{ estimateTime:500,id:2,projectId:1,quantity:200,taskId:1,task:{ id:1,isActive:1,name:'7" Sidewalk',subcategoryId:1,subcategory:{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },category:{ id:2,type:'PCC' },dimension:{ id:1,type:'SF' } },project:{ date:'2018-11-09T12:26:57.000Z',id:1,isActive:0,name:'Project 3' } },{ estimateTime:1,id:9,projectId:3,quantity:1,taskId:2,task:{ id:2,isActive:1,name:'6" Sidewalk',subcategoryId:1,subcategory:{ categoryId:2,id:1,type:'Sidewalk',dimensionId:1 },category:{ id:2,type:'PCC' },dimension:{ id:1,type:'SF' } },project:{ date:'2018-11-09T06:00:00.000Z',id:3,isActive:1,name:'Project 2' } }],
  currentEmployee:{ authorityId:1,crewId:1,firstName:'Joshua',id:2,isEmployed:1,isWorking:1,lastName:'Wootonn',pin:565656,authority:{ id:1,type:'Admin' },crew:{ id:1,name:'Crew 3' } },
  getCurrentShift: jest.fn(),
  clockOut: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  history: {
    push: jest.fn(),
    goBack: jest.fn()
  }
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};


const setup = overRides => {  
  return mount(<ClockOut {...props} {...overRides}/>);    
};


describe('ClockOut Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly if status === INIT', () => {
    setup();
  });
  it('should call this.props.getCurrentShift on componentDidMount', () => {
    expect(props.getCurrentShift).toHaveBeenCalledTimes(0);
    setup();
    expect(props.getCurrentShift).toHaveBeenCalledTimes(1);
  });  
  it('should call this.props.history.goBack from this.cancel', () => {    
    const wrapper = setup();
    expect(props.history.goBack).toHaveBeenCalledTimes(0);
    wrapper.instance().cancel();
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  });
  it('should render a loader if currentShift hasn\'t been fetched yet', () => {
    const wrapper = setup({ currentShift: null });
    expect(wrapper.find(Progress).length).toBe(1);
  }); 
  it('should test the onSubmit calls clockOut and onResolve it should history.push('/')', () => {
    const values = { lunch: 12,activities: {} };
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    expect(props.clockOut).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);  
    onSubmit(values,formikFunctions).then(() => {
      expect(props.history.push).toHaveBeenCalledTimes(1);    
      expect(props.clockOut).toHaveBeenCalledTimes(1);
      expect(props.clockOut).toHaveBeenCalledWith(values);
    });
  });
  it('should test the onSubmit calls clockOut and onReject doesn\'t do anything' , () => {
    const values = { lunch: 12,activities: {} };
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    expect(props.clockOut).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);  
    onSubmit(values,formikFunctions).then(() => {   
      expect(props.history.push).toHaveBeenCalledTimes(0);   
      expect(props.clockOut).toHaveBeenCalledTimes(1);
      expect(props.clockOut).toHaveBeenCalledWith(values);
    });
  });
  
});