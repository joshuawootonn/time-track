import React from 'react';
import { shallow } from 'enzyme';

import { Authority } from 'components/forms/Authority/authority';
import AuthorityHOC from 'components/forms/Authority';

const props =  {  
  classes: {},
  label: 'label',
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  errors: {}
};

const setup = overRides => {  
  return shallow(<Authority {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<AuthorityHOC {...props} {...overRides}/>);
};

describe.skip('Authority Component', () => {
  // it('should render correctly', () => {
  //   const wrapper = setup();
  //   expect(wrapper).toMatchSnapshot();    
  // });
  // it('should render correctly withStyles', () => {
  //   const wrapper = setupHOC();
  //   expect(wrapper).toMatchSnapshot();   
  // });
  // it('should call resetForm on authority-reset-button', () => {
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   instance.resetForm = jest.fn();
  //   expect(props.resetForm).toHaveBeenCalledTimes(0);
  //   wrapper.find('#authority-reset-button').first().simulate('click');
  //   expect(props.resetForm).toHaveBeenCalledTimes(1);
  // });
});