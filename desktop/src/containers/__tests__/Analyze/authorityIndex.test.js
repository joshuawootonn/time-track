import React from 'react';
import { mount } from 'enzyme';

import { AuthorityIndex } from 'containers/Analyze/authorityIndexContainer';
import domain from 'constants/domains';

const props = {
  selected: {},
  select: jest.fn(),
  authorities: [{ id: 1 }, { id: 2 }],
  getAllAuthorities: jest.fn().mockImplementationOnce(() => Promise.resolve())
};

const setup = overRides => {
  return mount(<AuthorityIndex {...props} {...overRides} />);
};

describe(`Authority Index Container`, () => {
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
    expect(props.select).toHaveBeenCalledWith(domain.AUTHORITY, { id: 1 });
  });
});
