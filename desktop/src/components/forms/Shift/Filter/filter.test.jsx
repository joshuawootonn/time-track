import React from 'react';
import { mount } from 'enzyme';

import { Formik } from 'formik';
import moment from 'moment';

import {
  Filter,
  ANALYZE_SHIFT_FILTER_RESET_BUTTON_ID,
  ANALYZE_SHIFT_FILTER_CLEAR_BUTTON_ID
} from '~/components/forms/Shift/Filter/filter';
import FilterHOC from '~/components/forms/Shift/Filter';

import {
  EMPLOYEE_MOCK,
  PROJECT_MOCK,
  CREW_MOCK,
  AUTHORITY_MOCK
} from '~/constants/modelMocks';

const INTIIAL_VALUES = {
  employeeId: -1,
  projectId: -1,
  authorityId: -1,
  crewId: -1,
  startTime: moment()
    .startOf(`week`)
    .format(`MM-DD-YY HH:mm:ss`),
  endTime: moment()
    .endOf(`week`)
    .format(`MM-DD-YY HH:mm:ss`)
};

const props = {
  classes: {},
  isSubmitting: false,
  resetForm: jest.fn(),
  clearFilter: jest.fn(),
  initialValues: INTIIAL_VALUES,
  errors: {},
  employees: EMPLOYEE_MOCK,
  projects: PROJECT_MOCK,
  crews: CREW_MOCK,
  authorities: AUTHORITY_MOCK,
  timeLeft: 400,
  generalError: ``
};

const setup = overRides => {
  return mount(
    <Formik
      initialValues={INTIIAL_VALUES}
      render={formikProps => (
        <Filter {...formikProps} {...props} {...overRides} />
      )}
    />
  );
};

const setupHOC = overRides => {
  return mount(
    <Formik
      initialValues={INTIIAL_VALUES}
      render={formikProps => (
        <FilterHOC {...formikProps} {...props} {...overRides} />
      )}
    />
  );
};

describe(`Filter Component`, () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it(`should mount correctly in add mode`, () => {
    setup({ initialValues: INTIIAL_VALUES });
  });
  it(`should render correctly withStyles in add mode`, () => {
    setupHOC({ initialValues: INTIIAL_VALUES });
  });
  it(`should call props.resetForm when #${ANALYZE_SHIFT_FILTER_RESET_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.resetForm).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_FILTER_RESET_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalled();
  });
  it(`should call props.resetForm when #${ANALYZE_SHIFT_FILTER_CLEAR_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.resetForm).not.toHaveBeenCalled();
    expect(props.clearFilter).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_FILTER_CLEAR_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalled();
    expect(props.clearFilter).toHaveBeenCalled();
  });
});
