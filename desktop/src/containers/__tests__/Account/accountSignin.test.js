import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { AccountSignin } from 'containers/Account/accountSigninContainer';

const asdf = { data:{ authorityId:0 } };
const props =  {  
  history: {
    push: jest.fn()
  },
  authorities: [{ id: 1, value: 'asdf', type: 'asdf' }],
  login: jest.fn()
    .mockImplementationOnce(() => Promise.resolve(asdf))
    .mockImplementationOnce(() => Promise.reject(new Error())),
  getStaticData: jest.fn()
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};

const setup = overRides => {  
  return mount(<AccountSignin {...props} {...overRides}/>);    
};

describe('Account Siginin Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();       
  });
  it('should test the onSubmit calls login and onResolve it should resetForm and  setStatus to {success: true} ', () => {
    const values = '4545454';
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.login).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);
    expect(props.getStaticData).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {      
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(props.login).toHaveBeenCalledTimes(1);        
      expect(props.login).toHaveBeenCalledWith(values);      
      expect(props.history.push).toHaveBeenCalledTimes(1);
      expect(props.getStaticData).toHaveBeenCalledTimes(1);
    });     
  });
  it('should test the onSubmit calls login and onResolve it should setStatus to {success: false} and setSubmitting to false and setErrors to {submit: "Invalid pin!"} ', () => {
    const values = { pin: '4545454' };
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    
    expect(props.login).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);
    expect(props.getStaticData).toHaveBeenCalledTimes(0);
    onSubmit(values,formikFunctions).then(() => {      
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(props.login).toHaveBeenCalledTimes(1);        
      expect(props.login).toHaveBeenCalledWith(values);      
      expect(props.history.push).toHaveBeenCalledTimes(0);
      expect(props.getStaticData).toHaveBeenCalledTimes(0);
    });     
  });  
});