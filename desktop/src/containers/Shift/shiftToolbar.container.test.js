import React from 'react';
import { mount } from 'enzyme';

import { ShiftToolbar } from 'containers/Shift/shiftToolbar.container';

import domain from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';
import { COMPLETE_SHIFT_MOCK } from 'constants/modelMocks';

const props = {
  selected: COMPLETE_SHIFT_MOCK[0],
  select: jest.fn(),
  setStatus: jest.fn(),
  toggleShiftFilter: jest.fn(),
  shiftFilterVisible: true
};

const setup = overRides => {
  return mount(<ShiftToolbar {...props} {...overRides} />);
};

describe(`Shift Toolbar Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should generate a proper label on this.selectLabel`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel(props.selected);
    expect(value).toEqual(`Joshua Wootonn's shift selected`);
  });
  it(`should call props.setStatus on this.add`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(
      domain.SHIFT,
      analyzeStatus.ADDING
    );
  });
});
