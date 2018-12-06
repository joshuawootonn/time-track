import React from 'react';
import { shallow } from 'enzyme';

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
  return shallow(<Crew {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<CrewHOC {...props} {...overRides}/>);
};

describe.skip('Crew Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
  it('should call resetForm on crew-reset-button', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.resetForm = jest.fn();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find('#crew-reset-button').first().simulate('click');
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
});