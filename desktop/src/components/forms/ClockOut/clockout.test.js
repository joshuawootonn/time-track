import React from 'react';
import { shallow, mount } from 'enzyme';
import { FieldArray, Formik } from 'formik';

import { Clockout,CLOCKOUT_FORM_ADD_ACTIVTIY,CLOCKOUT_FORM_REMOVE_ACTIVTIY } from 'components/forms/ClockOut/clockOut';
import ClockoutHOC from 'components/forms/ClockOut';


import {  PROJECT_MOCK, PROJECT_TASK_MOCK, ACTIVITY_MOCK } from 'constants/modelMocks';


const INITIAL_VALUES = {
  lunch: 30,
  activities: [
    {
      projectId: -1,
      projectTaskId: -1,
      length: 0,
      description: ``
    }
  ]
};
const props =  {  
  classes: {},
  label: `label`,
  isSubmitting: false,
  resetForm: jest.fn(),
  initialValues: INITIAL_VALUES,
  values: {
    activities: ACTIVITY_MOCK
  },
  setFieldValue: jest.fn(),
  handleSubmit: jest.fn(),
  shift: {},
  projects: PROJECT_MOCK,
  projectTasks: PROJECT_TASK_MOCK,
  cancel: jest.fn(),
  timeLeft: 0,
  generalError: `general error`,
  errors: {}
};
const renderProps = { 
  remove: jest.fn(),
  push: jest.fn()
};



const setup = overRides => {  
  return mount(
    <Formik
      initialValues={INITIAL_VALUES}
      render={formikProps => (
        <Clockout {...formikProps} {...props} {...overRides}/>)}
    />
  );    
};

const setupHOC = overRides => {
  return mount(
    <Formik
      initialValues={INITIAL_VALUES}
      render={formikProps => (
        <ClockoutHOC {...formikProps} {...props} {...overRides}/>)}
    />
  );
};

const setupWithRender = overRides => {
  const wrapper = setup();  
  const Render = wrapper.find(FieldArray).first().prop(`render`);  
  return shallow(<Render {...renderProps} {...overRides}/>);
};

describe(`Clockout Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();   
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should call render of acitvities fieldarray`, () => {
    setupWithRender();
  });


  it(`should remove an activity when a #${CLOCKOUT_FORM_REMOVE_ACTIVTIY}_{1} is clicked`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.remove).toHaveBeenCalledTimes(0);
    wrapper.find(`#${CLOCKOUT_FORM_REMOVE_ACTIVTIY}_0`).first().simulate(`click`);
    expect(renderProps.remove).toHaveBeenCalledTimes(1);
    expect(renderProps.remove).toHaveBeenCalledWith(0);
  });
  it(`should remove an activity when a #${CLOCKOUT_FORM_ADD_ACTIVTIY} is clicked`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.push).toHaveBeenCalledTimes(0);
    wrapper.find(`#${CLOCKOUT_FORM_ADD_ACTIVTIY}`).first().simulate(`click`);
    expect(renderProps.push).toHaveBeenCalledTimes(1);
  });

  it(`should toggle this.state.keyboardLayout on this.handleShift`, () => {
    const wrapper = setup().find(Clockout);
    expect(wrapper.state(`keyboardLayout`)).toBe(`default`);
    wrapper.instance().handleShift();
    expect(wrapper.state(`keyboardLayout`)).toBe(`shift`);
    wrapper.instance().handleShift();
    expect(wrapper.state(`keyboardLayout`)).toBe(`default`);
  });
  it(`should call this.props.setFieldValue if this.state.currentTextField holds the ref of a textField`, () => {
    const wrapper = setup().find(Clockout);
    expect(props.setFieldValue).not.toHaveBeenCalled();
    wrapper.setState({ currentTextField: `not null` });
    expect(props.setFieldValue).not.toHaveBeenCalled();
    wrapper.instance().onChange(`asdf`);
    expect(props.setFieldValue).toHaveBeenCalled();
    expect(props.setFieldValue).toHaveBeenCalledWith(`not null`, `asdf`);
  });
  it(`should call this.handleShift in onKeyPress if the button pressed is {shift}`, () => {
    const wrapper = setup().find(Clockout);
    expect(wrapper.state(`keyboardLayout`)).toBe(`default`);
    wrapper.instance().onKeyPress(`{shift}`);
    expect(wrapper.state(`keyboardLayout`)).toBe(`shift`);    
    wrapper.instance().onKeyPress(`{shift}`);
    expect(wrapper.state(`keyboardLayout`)).toBe(`default`);
    wrapper.instance().onKeyPress(`{shifdst}`);
    expect(wrapper.state(`keyboardLayout`)).toBe(`default`);
  });
  it(`should set state correctly for this.onDescriptionFocus and this.onDescriptionBlur should undo the changes`, () => {
    const wrapper = setup().find(Clockout);
    expect(wrapper.state(`isKeyboardVisible`)).toBe(false);
    expect(wrapper.state(`currentTextField`)).toBeNull();
    wrapper.instance().onDescriptionFocus();    
    expect(wrapper.state(`isKeyboardVisible`)).toBe(true);
    expect(wrapper.state(`currentTextField`)).not.toBeNull();    
    wrapper.instance().onDescriptionBlur();    
    expect(wrapper.state(`isKeyboardVisible`)).toBe(false);
    expect(wrapper.state(`currentTextField`)).toBeNull();
  });
});