import React from 'react';
import { mount } from 'enzyme';

import { Formik } from 'formik';

import { TaskFilter } from '~/containers/Task/taskFilter.container';

import { CATEGORY_MOCK, SUBCATEGORY_MOCK } from '~/constants/modelMocks';

const props = {
  categories: CATEGORY_MOCK,
  subcategories: SUBCATEGORY_MOCK,
  updateFilter: jest.fn(),
  clearFilter: jest.fn(),
  toggleFilter: jest.fn(),
  taskFilterVisible: true,
  taskFilters: {
    name: ``,
    isActive: true,
    categoryId: -1,
    subcategoryId: -1
  }
};

const formikFunctions = {
  resetForm: jest.fn()
};

const setup = overRides => {
  return mount(<TaskFilter {...props} {...overRides} />);
};

describe(`Task Filter Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should on return something is props.taskFilterVisible === true`, () => {
    const wrapperWhenIsVisible = setup();
    expect(wrapperWhenIsVisible.html()).not.toBeNull();
    const wrapperWhenNotIsVisible = setup({ taskFilterVisible: false });
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
