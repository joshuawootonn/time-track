import React from 'react';
import { shallow } from 'enzyme';

import { Category } from 'components/forms/Category/category';
import CategoryHOC from 'components/forms/Category';

const props =  {  
  classes: {},
  isSubmitting: true,
  initialValues: {},
  resetForm: jest.fn(),
  label: 'label',
  type: 'type',
  removeCategory: jest.fn(),
  errors: {}
};

const setup = overRides => {  
  return shallow(<Category {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<CategoryHOC {...props} {...overRides}/>);
};

describe('Category Component', () => {  
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();    
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a delete button when type===edit', () => {
    const wrapper = setup({ type: 'edit' });
    expect(wrapper).toMatchSnapshot();
  });
  it('should call resetForm on category-reset-button', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.resetForm = jest.fn();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find('#category-reset-button').first().simulate('click');
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
});