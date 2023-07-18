import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { CategoryDetail } from '~/containers/Analyze/categoryDetailContainer';
import { analyzeStatus } from '~/constants/analyze';

const props = {
  selected: { id: 1 },
  status: analyzeStatus.EDITING,
  updateCategory: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  createCategory: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  removeCategory: jest.fn()
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};

const setup = overRides => {
  return mount(<CategoryDetail {...props} {...overRides} />);
};

describe(`Category Detail Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly if status === EDITING`, () => {
    setup();
  });
  it(`should render correctly if status === INIT`, () => {
    setup({ status: analyzeStatus.INIT });
  });
  it(`should render correctly if status === ADDING`, () => {
    setup({ status: analyzeStatus.ADDING });
  });
  it(`should call removeCategory on this removeCategory`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.removeCategory).toHaveBeenCalledTimes(0);
    instance.removeCategory();
    expect(props.removeCategory).toHaveBeenCalledTimes(1);
  });
  it(`should test the onSubmit calls updateCategory and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { val: `asdf` };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.updateCategory).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);
      expect(props.updateCategory).toHaveBeenCalledTimes(1);
      expect(props.updateCategory).toHaveBeenCalledWith(values);
    });
  });
  it(`should test the onSubmit calls updateCategory and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { val: `asdf` };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.updateCategory).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);
      expect(props.updateCategory).toHaveBeenCalledTimes(1);
      expect(props.updateCategory).toHaveBeenCalledWith(values);
    });
  });

  it(`should test the onSubmit calls createCategory and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { val: `asdf` };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.createCategory).toHaveBeenCalledTimes(0);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions);
    expect(props.createCategory).toHaveBeenCalledTimes(1);
    expect(props.createCategory).toHaveBeenCalledWith(values);
  });
  it(`should test the onSubmit calls createCategory and onReject it should setStatus to {success: false} and setSubmitting to false and setErrors with {submit: e}`, () => {
    const values = { val: `asdf` };
    const wrapper = setup({ status: analyzeStatus.ADDING });
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.createCategory).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);
      expect(props.createCategory).toHaveBeenCalledTimes(1);
      expect(props.createCategory).toHaveBeenCalledWith(values);
    });
  });
});
