import React from 'react';
import { shallow } from 'enzyme';

import { Settings } from 'scenes/Analyze/settings';

const props = {
  classes: {},
  open: true,
  toggleModal: jest.fn()
};

const setup = overRides => {
  return shallow(<Settings {...props} {...overRides} />);
};

describe(`Settings Scene`, () => {
  it(`should render correctly`, () => {
    setup();
  });
  it(`should display different containers based on state.currentMenu`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(wrapper.state().currentMenu).toEqual(0);
    instance.menuSelect(2)();
    expect(wrapper.state().currentMenu).toEqual(2);
    instance.menuSelect(0)();
    expect(wrapper.state().currentMenu).toEqual(0);
    instance.menuSelect(3)();
    expect(wrapper.state().currentMenu).toEqual(3);
  });
});
