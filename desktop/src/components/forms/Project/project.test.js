import React from 'react';
import { shallow } from 'enzyme';
import { FieldArray } from 'formik';

import {
  Project,
  PROJECT_FORM_CATEGORY_FIELD_ID,
  PROJECT_FORM_SUBCATEGORY_FIELD_ID,
  PROJECT_FORM_REMOVE_PROJECT_TASK_BUTTON_ID,
  PROJECT_FORM_ADD_PROJECT_TASK_BUTTON_ID,
  PROJECT_FORM_RESET_BUTTON_ID,
  PROJECT_FORM_CLEAR_BUTTON_ID
} from 'components/forms/Project/project';
import ProjectHOC from 'components/forms/Project';

const props = {
  classes: {},
  label: `label`,
  type: `edit`,
  removeProject: jest.fn(),
  categories: [{ id: 0 }, { id: 1 }, { id: 2 }],
  subcategories: [{ id: 0 }, { id: 1 }, { id: 2 }],
  tasks: [
    {
      id: 0,
      category: { id: 0, name: `name0` },
      subcategory: { id: 0, name: `name0` }
    },
    {
      id: 1,
      category: { id: 1, name: `name1` },
      subcategory: { id: 1, name: `name1` }
    },
    {
      id: 2,
      category: { id: 2, name: `name2` },
      subcategory: { id: 2, name: `name2` }
    }
  ],
  isSubmitting: true,
  resetForm: jest.fn(),
  clearFilter: jest.fn(),
  initialValues: {},
  values: {
    projectTasks: [
      { id: 0, categoryId: 0, subcategoryId: 0, taskId: 0 },
      { id: 1, categoryId: 1, subcategoryId: 1, taskId: 1 }
    ]
  },
  errors: {}
};

const renderProps = {
  remove: jest.fn(),
  push: jest.fn(),
  form: {
    setFieldValue: jest.fn()
  }
};

const setup = overRides => {
  return shallow(<Project {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return shallow(<ProjectHOC {...props} {...overRides} />);
};

const setupWithRender = overRides => {
  const wrapper = setup();
  const Render = wrapper
    .find(FieldArray)
    .first()
    .prop(`render`);
  return shallow(<Render {...renderProps} {...overRides} />);
};

describe(`Project Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should call render of projectTask fieldarray`, () => {
    setupWithRender();
  });

  it(`should call onChange Category Field`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${PROJECT_FORM_CATEGORY_FIELD_ID}_1`)
      .first()
      .simulate(`change`);
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(2);
    expect(renderProps.form.setFieldValue).toHaveBeenLastCalledWith(
      `projectTasks.1.taskId`,
      -1
    );
  });
  it(`should call onChange Category Field`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${PROJECT_FORM_SUBCATEGORY_FIELD_ID}_1`)
      .first()
      .simulate(`change`);
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(renderProps.form.setFieldValue).toHaveBeenCalledWith(
      `projectTasks.1.taskId`,
      -1
    );
  });
  it(`should remove an projectTask when a #${PROJECT_FORM_REMOVE_PROJECT_TASK_BUTTON_ID}_1 is clicked`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.remove).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${PROJECT_FORM_REMOVE_PROJECT_TASK_BUTTON_ID}_1`)
      .first()
      .simulate(`click`);
    expect(renderProps.remove).toHaveBeenCalledTimes(1);
    expect(renderProps.remove).toHaveBeenCalledWith(1);
  });
  it(`should add an projectTask when a #${PROJECT_FORM_ADD_PROJECT_TASK_BUTTON_ID} is clicked`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.push).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${PROJECT_FORM_ADD_PROJECT_TASK_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(renderProps.push).toHaveBeenCalledTimes(1);
    expect(renderProps.push).toHaveBeenCalledWith({
      categoryId: -1,
      subcategoryId: -1,
      taskId: -1,
      quantity: 1,
      estimateTime: 1
    });
  });
  it(`should call props.resetForm on #${PROJECT_FORM_RESET_BUTTON_ID} button click`, () => {
    const wrapper = setup();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${PROJECT_FORM_RESET_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
    expect(props.resetForm).toHaveBeenCalledWith({});
  });
  it(`should only show the clear button when props.type === filter`, () => {
    const wrapperWithCorrectType = setup({ type: `filter` });
    expect(
      wrapperWithCorrectType.find(`#${PROJECT_FORM_CLEAR_BUTTON_ID}`).length
    ).toBe(1);
    const wrapperWithIncorrectType = setup();
    expect(
      wrapperWithIncorrectType.find(`#${PROJECT_FORM_CLEAR_BUTTON_ID}`).length
    ).toBe(0);
  });
  it(`should call props.resetForm and props.clearFilter on #${PROJECT_FORM_CLEAR_BUTTON_ID}`, () => {
    const wrapper = setup({ type: `filter` });
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#${PROJECT_FORM_CLEAR_BUTTON_ID}`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
    expect(props.resetForm).toHaveBeenCalledWith({});
  });
});
