import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';

import { ExportContainer } from 'containers/Export/exportContainer';

const props = {
  history: {
    goBack: jest.fn(),
    push: jest.fn()
  },
  exportToExcel: jest.fn().mockImplementationOnce(() => Promise.resolve())
};

const formikFunctions = {};

const setup = overRides => {
  return mount(<ExportContainer {...props} {...overRides} />);
};

describe(`Export Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should call props.history.push for this.cancel`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.push).toHaveBeenCalledTimes(0);
    instance.cancel();
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });
  it(`should call props.exportToExcel for the Formik onSubmit`, () => {
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);
    expect(props.exportToExcel).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);
    const values = { exportCategory: 1, start: 2, fileLocation: 3 };
    onSubmit(values, formikFunctions).then(() => {
      expect(props.exportToExcel).toHaveBeenCalledTimes(1);
      expect(props.history.push).toHaveBeenCalledTimes(1);
      expect(props.exportToExcel).toHaveBeenCalledWith(1, 2, 3);
    });
  });
});
