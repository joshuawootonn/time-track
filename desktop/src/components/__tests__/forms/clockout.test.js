import React from 'react';
import { shallow } from 'enzyme';

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

const setup = overRides => {  
  return shallow(<Clockout {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<ClockoutHOC {...props} {...overRides}/>);
};

describe.skip('Clockout Component', () => {
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
  it.skip('should call render of acitvities fieldarray', () => {
    const wrapper = setup();  
    wrapper.find('#activities').first().render({
      push: jest.fn(),
      remove: jest.fn(),
      registerField: jest.fn()
    });
  });
  it.skip('should remove an activity when a remove-activity-{1}', () => {
    const wrapper = setup();
    // TODO finish this test with validation of what the remove does
    wrapper.find('#remove-activity-1').first().simulate('click');
  });
  it.skip('should remove an activity when a remove-activity-{1}', () => {
    const wrapper = setup();
    // TODO finish this test with validation of what the add does
    wrapper.find('#add-activity').first().simulate('click');
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