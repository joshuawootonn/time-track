import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { CrewDetail } from 'containers/Analyze/crewDetailContainer';
import { analyzeStatus } from 'constants/analyze';

const props =  {  
  selected: {},
  status: analyzeStatus.EDITING,
  updateCrew: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error()))
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn()
};


const setup = overRides => {  
  return mount(<CrewDetail {...props} {...overRides}/>);    
};


describe('Crew Detail Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly if status === EDITING', () => {
    setup();       
  });
  it('should render correctly if status === INIT', () => {
    setup({ status: analyzeStatus.INIT });
  });
  it('should test the onSubmit calls updateCrew and onResolve it should resetForm and  setStatus to {success: true} ', () => {
    const values = { val: 'asdf' };
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.updateCrew).toHaveBeenCalledTimes(0);    
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {      
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);    
      expect(props.updateCrew).toHaveBeenCalledTimes(1);    
      expect(props.updateCrew).toHaveBeenCalledWith(values);
    });
  });
  it('should test the onSubmit calls updateCrew and onReject it should setStatus to {success: false} and setSubmitting to false', () => {
    const values = { val: 'asdf' };
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.updateCrew).toHaveBeenCalledTimes(0);    
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(props.updateCrew).toHaveBeenCalledTimes(1);
      expect(props.updateCrew).toHaveBeenCalledWith(values);
    });    
  });
});