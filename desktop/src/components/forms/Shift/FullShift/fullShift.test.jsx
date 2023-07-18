import React from 'react';
import { mount, shallow } from 'enzyme';
import { FieldArray, Formik } from 'formik';

import {
  FullShift,
  ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID,
  ANALYZE_SHIFT_FULL_SHIFT_REMOVE_ACTIVITY_BUTTON_ID,
  ANALYZE_SHIFT_FULL_SHIFT_ADD_ACTIVITY_BUTTON_ID,
  ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID
} from '~/components/forms/Shift/FullShift/fullShift';
import FullShiftHOC from '~/components/forms/Shift/FullShift';

import {
  EMPLOYEE_MOCK,
  PROJECT_MOCK,
  PROJECT_TASK_MOCK,
  ACTIVITY_MOCK
} from '~/constants/modelMocks';

const INITIAL_VALUES_ADD = {
  lunch: 30,
  clockInDate: `2019-04-05T07:30`,
  clockOutDate: `2019-04-05T07:31`,
  employeeId: -1,
  activities: [
    {
      projectId: -1,
      projectTaskId: -1,
      length: 0,
      description: ``
    }
  ]
};

const INTIIAL_VALUES_EDIT = {
  clockInDate: `2019-04-05T02:34`,
  clockOutDate: `2019-04-05T06:26`,
  employeeId: 76,
  id: 13539,
  length: 232,
  lunch: null,
  activities: [ACTIVITY_MOCK],
  employee: {
    authorityId: 2,
    crewId: 1,
    firstName: `Angel`,
    id: 76,
    isEmployed: 1,
    isWorking: 0,
    lastName: `Jacobo`,
    pin: 288839
  }
};

const props = {
  classes: {},
  isSubmitting: false,
  resetForm: jest.fn(),
  initialValues: INITIAL_VALUES_ADD,
  errors: {},
  projects: PROJECT_MOCK,
  projectTasks: PROJECT_TASK_MOCK,
  employees: EMPLOYEE_MOCK,
  timeLeft: 400,
  generalError: ``,
  values: {
    activities: ACTIVITY_MOCK
  }
};

const renderProps = {
  remove: jest.fn(),
  push: jest.fn(),
  form: {
    setFieldValue: jest.fn()
  }
};

const setup = overRides => {
  return mount(
    <Formik
      initialValues={INITIAL_VALUES_ADD}
      render={formikProps => (
        <FullShift {...formikProps} {...props} {...overRides} />
      )}
    />
  );
};

const setupHOC = overRides => {
  return mount(
    <Formik
      initialValues={INITIAL_VALUES_ADD}
      render={formikProps => (
        <FullShiftHOC {...formikProps} {...props} {...overRides} />
      )}
    />
  );
};

const setupWithRender = overRides => {
  const wrapper = setup();
  const Render = wrapper
    .find(FieldArray)
    .first()
    .prop(`render`);
  return shallow(<Render {...renderProps} {...overRides} />);
};

describe(`FullShift Component`, () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it(`should mount correctly in add mode`, () => {
    setup({ initialValues: INITIAL_VALUES_ADD });
  });
  it(`should render correctly withStyles in add mode`, () => {
    setupHOC({ initialValues: INITIAL_VALUES_ADD });
  });
  it(`should mount correctly in add mode`, () => {
    setup({ initialValues: INTIIAL_VALUES_EDIT });
  });
  it(`should render correctly withStyles in add mode`, () => {
    setupHOC({ initialValues: INTIIAL_VALUES_EDIT });
  });
  it(`should call props.resetForm when #${ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.resetForm).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalled();
  });
  it(`it should call render of activities fieldArray`, () => {
    setupWithRender();
  });
  it(`should remove an activity when #${ANALYZE_SHIFT_FULL_SHIFT_REMOVE_ACTIVITY_BUTTON_ID}_0 is clicked`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.remove).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_FULL_SHIFT_REMOVE_ACTIVITY_BUTTON_ID}_0`)
      .first()
      .simulate(`click`);
    expect(renderProps.remove).toHaveBeenCalled();
  });
  it(`should add an activity when #${ANALYZE_SHIFT_FULL_SHIFT_ADD_ACTIVITY_BUTTON_ID} is clicked`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.push).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_FULL_SHIFT_ADD_ACTIVITY_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(renderProps.push).toHaveBeenCalled();
  });
  it(`should renderProps.form.setFieldValue when project formik.Field changes`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.form.setFieldValue).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID}_0`)
      .first()
      .prop(`onChange`)();
    expect(renderProps.form.setFieldValue).toHaveBeenCalled();
    expect(renderProps.form.setFieldValue).toHaveBeenCalledWith(
      `activities.0.projectTaskId`,
      -1
    );
  });
});
