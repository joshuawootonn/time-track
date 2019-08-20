import React from 'react';
import { mount } from 'enzyme';

import { Select } from 'components/inputs/Select/select';
import SelectHOC from 'components/inputs/Select';

const props = {
  form: {
    errors: {},
    handleBlur: jest.fn()
  },
  field: {
    name: `name`,
    onChange: jest.fn(),
    value: `value`
  },
  label: `label`,
  labelProps: {},
  formControlProps: {},
  margin: `normal`,
  classes: {},
  helper: `normal`,
  fullWidth: true,
  onChange: jest.fn(),
  items: [{ id: 0, name: `name0` }]
};

const setup = overRides => {
  return mount(<Select {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return mount(<SelectHOC {...props} {...overRides} />);
};

describe(`Select Input`, () => {
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should call field.onChange and onChange on this.onChange`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.onChange).toHaveBeenCalledTimes(0);
    expect(props.field.onChange).toHaveBeenCalledTimes(0);
    instance.onChange({ event: `event` });
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.field.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith({ event: `event` });
  });
  it(`should call form.handleBlur on this.onBlur`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.form.handleBlur).toHaveBeenCalledTimes(0);
    instance.onBlur({ target: { name: `fake name` } });
    expect(props.form.handleBlur).toHaveBeenCalledTimes(1);
    expect(props.form.handleBlur).toHaveBeenCalledWith({
      target: { name: `name` }
    });
  });
});
