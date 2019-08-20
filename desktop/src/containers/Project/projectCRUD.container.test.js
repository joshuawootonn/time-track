import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';
import moment from 'moment';

import { ProjectCRUD } from 'containers/Project/projectCRUD.container';

import { analyzeStatus } from 'constants/analyze';

const props = {
  selected: {
    date: `2018-11-09T12:26:57.000Z`,
    id: 1,
    isActive: 0,
    name: `Project 3`,
    projectTasks: [
      {
        estimateTime: 0,
        id: 1,
        projectId: 1,
        quantity: 0,
        taskId: 2,
        task: {
          id: 2,
          isActive: 1,
          name: `6" Sidewalk`,
          subcategoryId: 1,
          subcategory: {
            categoryId: 2,
            id: 1,
            type: `Sidewalk`,
            dimensionId: 1
          },
          category: { id: 2, type: `PCC` },
          dimension: { id: 1, type: `SF` }
        },
        project: {
          date: `2018-11-09T12:26:57.000Z`,
          id: 1,
          isActive: 0,
          name: `Project 3`
        }
      },
      {
        estimateTime: 500,
        id: 2,
        projectId: 1,
        quantity: 200,
        taskId: 1,
        task: {
          id: 1,
          isActive: 1,
          name: `7" Sidewalk`,
          subcategoryId: 1,
          subcategory: {
            categoryId: 2,
            id: 1,
            type: `Sidewalk`,
            dimensionId: 1
          },
          category: { id: 2, type: `PCC` },
          dimension: { id: 1, type: `SF` }
        },
        project: {
          date: `2018-11-09T12:26:57.000Z`,
          id: 1,
          isActive: 0,
          name: `Project 3`
        }
      }
    ]
  },
  status: analyzeStatus.INIT,
  categories: [
    { id: 1, type: `Setup` },
    { id: 2, type: `PCC` },
    { id: 3, type: `Earthwork` }
  ],
  subcategories: [
    { categoryId: 2, id: 1, type: `Sidewalk`, dimensionId: 1 },
    { categoryId: 2, id: 2, type: `Pavement`, dimensionId: 1 }
  ],
  tasks: [
    {
      id: 1,
      isActive: 1,
      name: `7" Sidewalk`,
      subcategoryId: 1,
      subcategory: { categoryId: 2, id: 1, type: `Sidewalk`, dimensionId: 1 },
      category: { id: 2, type: `PCC` },
      dimension: { id: 1, type: `SF` }
    },
    {
      id: 2,
      isActive: 1,
      name: `6" Sidewalk`,
      subcategoryId: 1,
      subcategory: { categoryId: 2, id: 1, type: `Sidewalk`, dimensionId: 1 },
      category: { id: 2, type: `PCC` },
      dimension: { id: 1, type: `SF` }
    }
  ],
  updateProject: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createProject: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  removeProject: jest.fn()
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};

const setup = overRides => {
  return mount(<ProjectCRUD {...props} {...overRides} />);
};

describe(`Project CRUD Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly if status === INIT`, () => {
    setup();
  });
  it(`should render correctly if status === EDITING`, () => {
    setup({ status: analyzeStatus.EDITING });
  });
  it(`should render correctly if status === ADDING`, () => {
    setup({ status: analyzeStatus.ADDING });
  });
  it(`should call removeProject on this.removeProject`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.removeProject).toHaveBeenCalledTimes(0);
    instance.removeProject();
    expect(props.removeProject).toHaveBeenCalledTimes(1);
  });
  it(`should test the onSubmit calls updateProject and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = {
      id: 1,
      isActive: 0,
      name: `name`,
      projectTasks: {},
      date: moment()
        .startOf(`day`)
        .format(`MM-DD-YY HH:mm:ss`)
    };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.updateProject).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);
      expect(props.updateProject).toHaveBeenCalledTimes(1);
      expect(props.updateProject).toHaveBeenCalledWith(values);
    });
  });
  it(`should test the onSubmit calls updateProject and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = {
      id: 1,
      isActive: 0,
      name: `name`,
      projectTasks: {},
      date: moment()
        .startOf(`day`)
        .format(`MM-DD-YY HH:mm:ss`)
    };
    const wrapper = setup({ status: analyzeStatus.EDITING });
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.updateProject).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);
      expect(props.updateProject).toHaveBeenCalledTimes(1);
      expect(props.updateProject).toHaveBeenCalledWith(values);
    });
  });

  it(`should test the onSubmit calls createProject and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = {
      isActive: 0,
      name: `name`,
      projectTasks: {},
      date: moment(`2018-11-09T12:26:57.000Z`).format(`MM-DD-YY HH:mm:ss`)
    };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.createProject).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions);
    expect(props.createProject).toHaveBeenCalledTimes(1);
    expect(props.createProject).toHaveBeenCalledWith(values);
  });
  it(`should test the onSubmit calls createProject and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = {
      isActive: 0,
      name: `name`,
      projectTasks: {},
      date: moment(`2018-11-09T12:26:57.000Z`).format(`MM-DD-YY HH:mm:ss`)
    };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.createProject).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);
      expect(props.createProject).toHaveBeenCalledTimes(1);
      expect(props.createProject).toHaveBeenCalledWith(values);
    });
  });
});
