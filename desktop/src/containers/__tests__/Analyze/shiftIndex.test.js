import React from 'react';
import { mount } from 'enzyme';

import { ShiftIndex } from 'containers/Analyze/shiftIndexContainer';
import domain from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';
import Progress from 'components/helpers/Progress';

const psuedoShifts = [{ 'clockInDate':'2018-11-10T06:26:57.000Z','clockOutDate':'2018-11-10T06:26:57.000Z','employeeId':2,'id':1,'length':600,'lunch':null,'activities':[{ 'description':'This is a description','id':2,'length':600,'projectTaskId':1,'shiftId':1 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Joshua','id':2,'isEmployed':1,'isWorking':1,'lastName':'Wootonn','pin':565656 } },{ 'clockInDate':'2018-11-10T06:26:57.000Z','clockOutDate':'2018-11-10T06:26:57.000Z','employeeId':1,'id':2,'length':600,'lunch':null,'activities':[{ 'description':'This is a description 2','id':3,'length':600,'projectTaskId':2,'shiftId':2 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Jay','id':1,'isEmployed':1,'isWorking':0,'lastName':'Simon','pin':234234 } },{ 'clockInDate':'2018-11-10T06:26:57.000Z','clockOutDate':'2018-11-10T06:26:57.000Z','employeeId':1,'id':3,'length':600,'lunch':null,'activities':[{ 'description':'This is a description 3','id':1,'length':600,'projectTaskId':1,'shiftId':3 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Jay','id':1,'isEmployed':1,'isWorking':0,'lastName':'Simon','pin':234234 } },{ 'clockInDate':'2018-11-09T13:30:00.000Z','clockOutDate':'2018-11-09T20:34:00.000Z','employeeId':1,'id':4,'length':424,'lunch':30,'activities':[{ 'description':'','id':7,'length':390,'projectTaskId':1,'shiftId':4 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Jay','id':1,'isEmployed':1,'isWorking':0,'lastName':'Simon','pin':234234 } },{ 'clockInDate':'2018-11-09T13:30:00.000Z','clockOutDate':'2018-11-09T21:10:00.000Z','employeeId':2,'id':5,'length':460,'lunch':30,'activities':[{ 'description':'','id':8,'length':435,'projectTaskId':1,'shiftId':5 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Joshua','id':2,'isEmployed':1,'isWorking':1,'lastName':'Wootonn','pin':565656 } },{ 'clockInDate':'2018-11-09T13:30:00.000Z','clockOutDate':'2018-11-09T21:12:00.000Z','employeeId':2,'id':6,'length':462,'lunch':30,'activities':[{ 'description':'','id':9,'length':435,'projectTaskId':1,'shiftId':6 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Joshua','id':2,'isEmployed':1,'isWorking':1,'lastName':'Wootonn','pin':565656 } },{ 'clockInDate':'2018-11-09T13:30:00.000Z','clockOutDate':'2018-11-09T21:15:00.000Z','employeeId':2,'id':7,'length':465,'lunch':30,'activities':[{ 'description':'','id':13,'length':435,'projectTaskId':1,'shiftId':7 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Joshua','id':2,'isEmployed':1,'isWorking':1,'lastName':'Wootonn','pin':565656 } },{ 'clockInDate':'2018-11-09T13:30:00.000Z','clockOutDate':'2018-11-09T21:50:00.000Z','employeeId':2,'id':8,'length':500,'lunch':30,'activities':[{ 'description':'','id':14,'length':465,'projectTaskId':2,'shiftId':8 }],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Joshua','id':2,'isEmployed':1,'isWorking':1,'lastName':'Wootonn','pin':565656 } },{ 'clockInDate':'2018-11-25T15:00:00.000Z','clockOutDate':null,'employeeId':2,'id':9,'length':null,'lunch':null,'activities':[],'employee':{ 'authorityId':1,'crewId':1,'firstName':'Joshua','id':2,'isEmployed':1,'isWorking':1,'lastName':'Wootonn','pin':565656 } }];
const props =  {  
  selected: psuedoShifts[0],
  select: jest.fn(),
  shifts: psuedoShifts,
  setStatus: jest.fn(),
  getAllProjects: jest.fn()
    .mockImplementationOnce(() => Promise.resolve()),
  getAllEmployees: jest.fn()
    .mockImplementationOnce(() => Promise.resolve()),
  getAllTasks: jest.fn()
    .mockImplementationOnce(() => Promise.resolve()),
  getShiftsInRange: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
};

const setup = overRides => {  
  return mount(<ShiftIndex {...props} {...overRides}/>);    
};


describe('Shift Index Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();       
  });
  it('should render loader if shifts falsey', () => {
    const wrapper = setup({ shifts: null });
    expect(wrapper.find(Progress).length).toBeGreaterThan(0);
  });
  it('should generate a proper label on this.selectLabel', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel(props.selected);
    expect(value).toEqual('Joshua Wootonn\'s shift selected');
  });
  it('should call props.select on this.select', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.select({ id: 1 });
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(domain.SHIFT,{ id: 1 });
  });
  it('should call props.setStatus on this.add', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(domain.SHIFT,analyzeStatus.ADDING);
  });
});