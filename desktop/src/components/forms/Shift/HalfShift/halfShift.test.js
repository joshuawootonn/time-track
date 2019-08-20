import React from 'react';
import { mount } from 'enzyme';

import { Formik } from 'formik';

import {
  HalfShift,
  ANALYZE_SHIFT_HALF_SHIFT_RESET_BUTTON_ID
} from 'components/forms/Shift/HalfShift/halfShift';
import HalfShiftHOC from 'components/forms/Shift/HalfShift';

import { EMPLOYEE_MOCK } from 'constants/modelMocks';

const INITIAL_VALUES_ADD = {
  clockInDate: `2019-04-05T07:30`,
  employeeId: -1
};

const INTIIAL_VALUES_EDIT = {
  id: 1,
  employeeId: 1,
  clockInDate: `2019-04-04T18:42`
};

const props = {
  classes: {},
  isSubmitting: false,
  resetForm: jest.fn(),
  initialValues: INITIAL_VALUES_ADD,
  errors: {},
  employees: EMPLOYEE_MOCK,
  timeLeft: 400,
  generalError: ``
};

const setup = overRides => {
  return mount(
    <Formik
      initialValues={INITIAL_VALUES_ADD}
      render={formikProps => (
        <HalfShift {...formikProps} {...props} {...overRides} />
      )}
    />
  );
};

const setupHOC = overRides => {
  return mount(
    <Formik
      initialValues={INITIAL_VALUES_ADD}
      render={formikProps => (
        <HalfShiftHOC {...formikProps} {...props} {...overRides} />
      )}
    />
  );
};

describe(`HalfShift Component`, () => {
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
  it(`should call props.resetForm when #${ANALYZE_SHIFT_HALF_SHIFT_RESET_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.resetForm).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_HALF_SHIFT_RESET_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalled();
  });
});
