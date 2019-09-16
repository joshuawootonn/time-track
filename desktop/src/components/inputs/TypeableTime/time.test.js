import React from 'react';
import { mount } from 'enzyme';

import { Time } from 'components/inputs/Time/time';
import TimeHOC from 'components/inputs/Time';

const props = {
  form: {
    errors: {},
    setFieldValue: jest.fn()
  },
  field: {
    name: `name`,
    value: 180
  },
  margin: `none`,
  fullWidth: true,
  classes: {},
  classeName: `class`,
  helper: `normal`,
  label1: `hour`,
  label2: `minutes`
};

const setup = overRides => {
  return mount(<Time {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return mount(<TimeHOC {...props} {...overRides} />);
};

describe(`Time Input`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should call setFieldValue on this.onChangeHours`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.form.setFieldValue).toHaveBeenCalledTimes(0);
    instance.onChangeHours({ target: { value: 20 } });
    expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(props.form.setFieldValue).toHaveBeenCalledWith(`name`, 20);
  });
  it(`should call setFieldValue on this.onChangeMinutes`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.form.setFieldValue).toHaveBeenCalledTimes(0);
    instance.onChangeMinutes({ target: { value: 20 } });
    expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(props.form.setFieldValue).toHaveBeenCalledWith(`name`, 200);
  });
});
