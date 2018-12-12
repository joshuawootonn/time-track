import React from 'react';
import { shallow } from 'enzyme';

import { Task } from 'components/forms/Task/task';
import TaskHOC from 'components/forms/Task';

const props =  {  
  classes: {},
  label: 'label',
  removeTask: jest.fn(),
  type: 'edit',
  categories: [{ id: 0 },{ id: 1 },{ id: 2 }],
  subcategories: [{ id: 0 },{ id: 1 },{ id: 2 }],
  resetForm: jest.fn(),
  initialValues: {},
  isSubmitting: true,
  values: {
    pin: '123'
  },
  editCategories: jest.fn(),
  errors: {}
};

const setup = overRides => {  
  return shallow(<Task {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<TaskHOC {...props} {...overRides}/>);
};

describe('Task Component', () => {
  it('should render correctly', () => {
    setup();
  });
  it('should render correctly withStyles', () => {
    setupHOC();
  });
  it('should resetForm when #task-reset-button is clicked', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.resetForm = jest.fn();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find('#task-reset-button').first().simulate('click');
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });  
});