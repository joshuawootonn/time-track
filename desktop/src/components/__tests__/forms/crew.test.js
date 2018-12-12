import React from 'react';
import { Formik } from 'formik';
import { mount } from 'enzyme';

import { Crew } from 'components/forms/Crew/crew';
import CrewHOC from 'components/forms/Crew';


const props =  {  
  classes: {},
  label: 'label',
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  errors: {}
};


const setup = overRides => {  
  return mount(<Formik render={formikFunctions => <Crew {...props}  {...formikFunctions} {...overRides}/>}></Formik>);    
};

const setupHOC = overRides => {  
  return mount(<Formik render={formikFunctions => <CrewHOC {...props}  {...formikFunctions} {...overRides}/>}></Formik>);    
};

describe('Crew Component', () => {  
  it('should render correctly', () => {
    setup();   
  });
  it('should render correctly withStyles', () => {
    setupHOC();
  });
  it('should call resetForm on crew-reset-button', () => {
    const resetForm = jest.fn();
    const wrapper = mount(<Formik render={formikFunctions => <Crew {...props}  {...formikFunctions} resetForm={resetForm} />}></Formik>);
    expect(resetForm).toHaveBeenCalledTimes(0);
    wrapper.find('#crew-reset-button').first().simulate('click');
    expect(resetForm).toHaveBeenCalledTimes(1);
  });  
});