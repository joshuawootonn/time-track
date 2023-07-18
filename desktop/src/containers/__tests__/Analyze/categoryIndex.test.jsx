import React from 'react';
import { mount } from 'enzyme';

import { CategoryIndex } from '~/containers/Analyze/categoryIndexContainer';
import domain from '~/constants/domains';
import { analyzeStatus } from '~/constants/analyze';

const props = {
  selected: {},
  select: jest.fn(),
  categories: [{ id: 1 }, { id: 2 }],
  setStatus: jest.fn(),
  getAllCategories: jest.fn().mockImplementationOnce(() => Promise.resolve())
};

const setup = overRides => {
  return mount(<CategoryIndex {...props} {...overRides} />);
};

describe(`Category Index Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should generate a proper label on this.selectLabel`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel({ type: `Josh` });
    expect(value).toEqual(`Josh selected`);
  });
  it(`should call props.select on this.select`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.select({ id: 1 });
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(domain.CATEGORY, { id: 1 });
  });
  it(`should call props.setStatus on this.add`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(
      domain.CATEGORY,
      analyzeStatus.ADDING
    );
  });
});
