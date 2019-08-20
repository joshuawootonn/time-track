import React from 'react';
import { mount } from 'enzyme';

import { Formik } from 'formik';
import moment from 'moment';

import { ShiftFilter } from 'containers/Shift/shiftFilter.container';

import {
  EMPLOYEE_MOCK,
  PROJECT_MOCK,
  AUTHORITY_MOCK,
  CREW_MOCK
} from 'constants/modelMocks';

const props = {
  crews: CREW_MOCK,
  authorities: AUTHORITY_MOCK,
  projects: PROJECT_MOCK,
  employees: EMPLOYEE_MOCK,
  updateFilter: jest.fn(),
  clearFilter: jest.fn(),
  toggleFilter: jest.fn(),
  getShifts: jest.fn().mockImplementationOnce(() => Promise.resolve()),
  shiftFilterVisible: true,
  shiftFilters: {
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
  }
};

const formikFunctions = {
  resetForm: jest.fn()
};

const setup = overRides => {
  return mount(<ShiftFilter {...props} {...overRides} />);
};

describe(`Shift Filter Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should on return something is props.shiftFilterVisible === true`, () => {
    const wrapperWhenIsVisible = setup();
    expect(wrapperWhenIsVisible.html()).not.toBeNull();
    const wrapperWhenNotIsVisible = setup({ shiftFilterVisible: false });
    expect(wrapperWhenNotIsVisible.html()).toBeNull();
  });
  it(`should onSubmit call props.updateFilter, props.toggleFilter, and props.formikFunctions.resetForm `, async () => {
    const values = { val: `asdf`, isEmployed: 0, isWorking: 0 };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.updateFilter).not.toHaveBeenCalled();
    expect(props.toggleFilter).not.toHaveBeenCalled();
    expect(formikFunctions.resetForm).not.toHaveBeenCalled();
    await onSubmit(values, formikFunctions);
    expect(props.toggleFilter).toHaveBeenCalled();
    expect(formikFunctions.resetForm).toHaveBeenCalled();
    expect(props.updateFilter).toHaveBeenCalled();
  });
});
