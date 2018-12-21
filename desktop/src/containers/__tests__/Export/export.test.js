import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { ExportContainer } from 'containers/Export/exportContainer';

const props =  {   
  history: {
    goBack: jest.fn()
  },
  exportToExcel: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
};

const formikFunctions = {};

const setup = overRides => {  
  return mount(<ExportContainer {...props} {...overRides}/>);    
};

describe('Export Container', () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();       
  });  
  it('should call props.history.goBack for this.cancel', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.goBack).toHaveBeenCalledTimes(0);
    instance.cancel();
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  })
  it('should call props.exportToExcel for the Formik onSubmit', () => {
    const wrapper = setup();
    const onSubmit = wrapper.find(Formik).first().prop('onSubmit');
    expect(props.exportToExcel).toHaveBeenCalledTimes(0);    
    expect(props.history.goBack).toHaveBeenCalledTimes(0);
    const values = {}
    onSubmit(values,formikFunctions).then(() => {      
      expect(props.exportToExcel).toHaveBeenCalledTimes(1); 
      expect(props.history.goBack).toHaveBeenCalledTimes(1);    
      expect(props.exportToExcel).toHaveBeenCalledWith(values);
    });
  });  
});