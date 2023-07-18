import React from 'react';
import { mount } from 'enzyme';

import {
  FormHeader,
  ANALYZE_SHIFT_EXTENT_BUTTON_ID
} from '~/components/forms/Shift/FormHeader/formHeader';
import FormHeaderHOC from '~/components/forms/Shift/FormHeader';

import * as formTypes from '~/constants/formTypes';
import { analyzeStatus } from '~/constants/analyze';

const props = {
  classes: {},
  remove: jest.fn(),
  label: `label`,
  type: analyzeStatus.ADDING,
  extent: formTypes.FULL_SHIFT,
  extentOptions: [
    {
      type: formTypes.FULL_SHIFT,
      label: `Full Shift`
    }
  ],
  updateExtent: jest.fn()
};

const setup = overRides => {
  return mount(<FormHeader {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return mount(<FormHeaderHOC {...props} {...overRides} />);
};

describe(`Form Header Component`, () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it(`should mount correctly`, () => {
    setup();
  });
  it(`should mount correctly withStyles`, () => {
    setupHOC();
  });
  it(`should call props.updateExtent when #${ANALYZE_SHIFT_EXTENT_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.updateExtent).not.toHaveBeenCalled();
    wrapper
      .find(`#${ANALYZE_SHIFT_EXTENT_BUTTON_ID}_0`)
      .first()
      .simulate(`click`);
    expect(props.updateExtent).toHaveBeenCalled();
  });
});
