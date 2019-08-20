import React from 'react';
import { shallow } from 'enzyme';

import {
  Task,
  TASK_FORM_CLEAR_BUTTON_ID,
  TASK_FORM_CATEGORY_FIELD_ID,
  TASK_FORM_RESET_BUTTON_ID
} from 'components/forms/Task/task';
import TaskHOC from 'components/forms/Task';

const props = {
  classes: {},
  label: `label`,
  removeTask: jest.fn(),
  type: `edit`,
  categories: [{ id: 0 }, { id: 1 }, { id: 2 }],
  subcategories: [{ id: 0 }, { id: 1 }, { id: 2 }],
  resetForm: jest.fn(),
  initialValues: {},
  isSubmitting: true,
  values: {
    pin: `123`
  },
  editCategories: jest.fn(),
  clearFilter: jest.fn(),
  setFieldValue: jest.fn(),
  errors: {}
};

const setup = overRides => {
  return shallow(<Task {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return shallow(<TaskHOC {...props} {...overRides} />);
};

describe(`Task Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should value.setcategoryId on the category onChange`, () => {
    const wrapper = setup();
    expect(props.setFieldValue).not.toHaveBeenCalled();
    const onChangeMethod = wrapper
      .find(`#${TASK_FORM_CATEGORY_FIELD_ID}`)
      .first()
      .prop(`onChange`);
    onChangeMethod();
    expect(props.setFieldValue).toHaveBeenCalled();
  });
  it(`should resetForm when #${TASK_FORM_RESET_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${TASK_FORM_RESET_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
  it(`should only show the clear button when props.type === filter`, () => {
    const wrapperWithCorrectType = setup({ type: `filter` });
    expect(
      wrapperWithCorrectType.find(`#${TASK_FORM_CLEAR_BUTTON_ID}`).length
    ).toBe(1);
    const wrapperWithIncorrectType = setup();
    expect(
      wrapperWithIncorrectType.find(`#${TASK_FORM_CLEAR_BUTTON_ID}`).length
    ).toBe(0);
  });
  it(`should call props.resetForm and props.clearFilter on #${TASK_FORM_CLEAR_BUTTON_ID}`, () => {
    const wrapper = setup({ type: `filter` });
    expect(props.resetForm).not.toHaveBeenCalled();
    expect(props.clearFilter).not.toHaveBeenCalled();
    wrapper
      .find(`#${TASK_FORM_CLEAR_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalled();
    expect(props.clearFilter).toHaveBeenCalled();
  });
});
