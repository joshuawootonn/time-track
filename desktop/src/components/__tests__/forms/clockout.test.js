import React from 'react';
import { shallow,mount } from 'enzyme';
import { FieldArray } from 'formik';

import { Clockout } from 'components/forms/ClockOut/clockOut';
import ClockoutHOC from 'components/forms/ClockOut';

const props =  {  
  classes: {},
  label: 'label',
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  values: {
    activities: [{ projectId:1 },{ projectId:0 }]
  },
  setFieldValue: jest.fn(),
  handleSubmit: jest.fn(),
  shift: {},
  projects: [{ id: 1 },{ id: 0 }],
  projectTasks: [{ projectId:1,task: { name: 'name' } },{ projectId: 0,task: { name: 'name' } }],
  cancel: jest.fn(),
  timeLeft: 0,
  generalError: 'general error',
  errors: {}
};
const renderProps = { 
  remove: jest.fn(),
  push: jest.fn()
};

const setup = overRides => {  
  return shallow(<Clockout {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<ClockoutHOC {...props} {...overRides}/>);
};

const setupWithRender = overRides => {
  const wrapper = setup();  
  const Render = wrapper.find(FieldArray).first().prop('render');  
  return shallow(<Render {...renderProps} />);
};

describe('Clockout Component', () => {
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
  it('should call render of acitvities fieldarray', () => {
    setupWithRender();
  });
  it('should remove an activity when a remove-activity-{1}', () => {
    const wrapper = setupWithRender();
    expect(renderProps.remove).toHaveBeenCalledTimes(0);
    wrapper.find('#remove-activity-1').first().simulate('click');
    expect(renderProps.remove).toHaveBeenCalledTimes(1);
    expect(renderProps.remove).toHaveBeenCalledWith(1);
  });
  it('should remove an activity when a remove-activity-{1}', () => {
    const wrapper = setupWithRender();
    expect(renderProps.push).toHaveBeenCalledTimes(0);
    wrapper.find('#add-activity').first().simulate('click');
    expect(renderProps.push).toHaveBeenCalledTimes(1);
  });
  
  // it('should call resetForm on authority-reset-button', () => {
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   instance.resetForm = jest.fn();
  //   expect(props.resetForm).toHaveBeenCalledTimes(0);
  //   wrapper.find('#authority-reset-button').first().simulate('click');
  //   expect(props.resetForm).toHaveBeenCalledTimes(1);
  // });
});