import React from 'react';
import { mount } from 'enzyme';

import { Formik } from 'formik';
import moment from 'moment';

import { ProjectFilter } from 'containers/Project/projectFilter.container';

const props = {
  updateFilter: jest.fn(),
  clearFilter: jest.fn(),
  toggleFilter: jest.fn(),
  projectFilterVisible: true,
  projectFilters: {
    name: ``,
    isActive: true,
    startTime: moment()
      .subtract(1, `years`)
      .format(`MM-DD-YY HH:mm:ss`),
    endTime: moment()
      .add(1, `years`)
      .format(`MM-DD-YY HH:mm:ss`)
  }
};

const formikFunctions = {
  resetForm: jest.fn()
};

const setup = overRides => {
  return mount(<ProjectFilter {...props} {...overRides} />);
};

describe(`Project Filter Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should on return something is props.projectFilterVisible === true`, () => {
    const wrapperWhenIsVisible = setup();
    expect(wrapperWhenIsVisible.html()).not.toBeNull();
    const wrapperWhenNotIsVisible = setup({ projectFilterVisible: false });
    expect(wrapperWhenNotIsVisible.html()).toBeNull();
  });
  it(`should onSubmit call props.updateFilter, props.toggleFilter, and props.formikFunctions.resetForm `, () => {
    const values = { val: `asdf`, isEmployed: 0, isWorking: 0 };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.updateFilter).not.toHaveBeenCalled();
    expect(props.toggleFilter).not.toHaveBeenCalled();
    expect(formikFunctions.resetForm).not.toHaveBeenCalled();
    onSubmit(values, formikFunctions);
    expect(props.toggleFilter).toHaveBeenCalled();
    expect(formikFunctions.resetForm).toHaveBeenCalled();
    expect(props.updateFilter).toHaveBeenCalled();
  });
});
