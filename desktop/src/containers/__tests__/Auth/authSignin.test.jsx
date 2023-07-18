import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { AuthSignin } from '~/containers/Auth/authSigninContainer';

const asdf = { data: { authorityId: 0 } };
const props = {
  history: {
    push: jest.fn()
  },
  login: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(asdf))
    .mockImplementationOnce(() => Promise.reject(new Error()))
    .mockImplementationOnce(() => Promise.resolve(asdf))
    .mockImplementationOnce(() => Promise.reject(new Error()))
    .mockImplementationOnce(() => Promise.resolve(asdf))
    .mockImplementationOnce(() => Promise.reject(new Error()))
    .mockImplementationOnce(() => Promise.reject(new Error()))
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};

const setup = overRides => {
  return mount(<AuthSignin {...props} {...overRides} />);
};

describe(`Auth Signin Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should test the onSubmit calls login and onResolve it should resetForm and  setStatus to {success: true} `, () => {
    const values = { username: `josh`, password: `5656` };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.login).toHaveBeenCalledTimes(1);
    expect(formikFunctions.resetForm).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.resetForm).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(props.login).toHaveBeenCalledTimes(2);
      expect(props.login).toHaveBeenCalledWith(
        values.ip,
        values.username,
        values.password
      );
      expect(props.history.push).toHaveBeenCalledTimes(2);
    });
  });
  it(`should test the onSubmit calls login and onResolve it should setStatus to {success: false} and setSubmitting to false and setErrors to {submit: "Invalid pin!"} `, () => {
    const values = { username: `josh`, password: `5656` };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);

    expect(props.login).toHaveBeenCalledTimes(1);
    expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setErrors).toHaveBeenCalledTimes(0);
    expect(formikFunctions.setStatus).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(formikFunctions.setSubmitting).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setErrors).toHaveBeenCalledTimes(1);
      expect(formikFunctions.setStatus).toHaveBeenCalledTimes(1);
      expect(props.login).toHaveBeenCalledTimes(2);
      expect(props.login).toHaveBeenCalledWith(
        values.ip,
        values.username,
        values.password
      );
      expect(props.history.push).toHaveBeenCalledTimes(1);
    });
  });

  // it('should call history.push with // on this.back', () => {
  //   const values = '/';
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   expect(props.history.push).toHaveBeenCalledTimes(0);
  //   instance.back();
  //   expect(props.history.push).toHaveBeenCalledTimes(1);
  //   expect(props.history.push).toHaveBeenCalledWith(values);
  // });
  // it('should call history.push on successful this.clockIn ', () => {
  //   const values = { };
  //   const wrapper = setup();
  //   const instance = wrapper.instance();

  //   expect(props.clockIn).toHaveBeenCalledTimes(0);
  //   expect(props.history.push).toHaveBeenCalledTimes(0);
  //   instance.clockIn().then(() => {
  //     expect(props.history.push).toHaveBeenCalledTimes(1);
  //     expect(props.clockIn).toHaveBeenCalledTimes(1);
  //     expect(props.clockIn).toHaveBeenCalledWith(values);
  //   });
  // });
  // it('should call history.push with /type/clockout on this.clockOut', () => {
  //   const values = `/${props.type}/${routes.CLOCKOUT}`;
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   expect(props.history.push).toHaveBeenCalledTimes(0);
  //   instance.clockOut();
  //   expect(props.history.push).toHaveBeenCalledTimes(1);
  //   expect(props.history.push).toHaveBeenCalledWith(values);
  // });
  // it('should call history.push with /type/analyze on this.analze', () => {
  //   const values = `/${props.type}/${routes.ANALYZE}`;
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   expect(props.history.push).toHaveBeenCalledTimes(0);
  //   instance.analyze();
  //   expect(props.history.push).toHaveBeenCalledTimes(1);
  //   expect(props.history.push).toHaveBeenCalledWith(values);
  // });
  // it('should call history.push with /type/export on this.export', () => {
  //   const values = `/${props.type}/${routes.EXPORT}`;
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   expect(props.history.push).toHaveBeenCalledTimes(0);
  //   instance.export();
  //   expect(props.history.push).toHaveBeenCalledTimes(1);
  //   expect(props.history.push).toHaveBeenCalledWith(values);
  // });
});
