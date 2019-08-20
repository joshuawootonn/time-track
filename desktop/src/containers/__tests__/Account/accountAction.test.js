import React from 'react';
import { shallow } from 'enzyme';

import { AccountAction } from 'containers/Account/accountActionContainer';
import * as routes from 'constants/routes';

const props = {
  history: {
    push: jest.fn()
  },
  employees: { 1: {}, 0: {}, 2: {} },
  employee: { current: { id: 1 } },
  openSnack: jest.fn(),
  type: `type`,
  currentEmployee: { isWorking: 1 },
  clockIn: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  clearFilters: jest.fn()
};

const setup = overRides => {
  return shallow(<AccountAction {...props} {...overRides} />);
};

describe(`Account Action Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should call history.push with // on this.back`, () => {
    const values = `/`;
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.push).toHaveBeenCalledTimes(0);
    instance.back();
    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(values);
  });
  it(`should call history.push on successful this.clockIn `, () => {
    const values = {};
    const wrapper = setup();
    const instance = wrapper.instance();

    expect(props.clockIn).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);
    instance.clockIn().then(() => {
      expect(props.history.push).toHaveBeenCalledTimes(1);
      expect(props.clockIn).toHaveBeenCalledTimes(1);
      expect(props.clockIn).toHaveBeenCalledWith(values);
    });
  });
  it(`should call history.push with /type/clockout on this.clockOut`, () => {
    const values = `/${props.type}/${routes.CLOCKOUT}`;
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.push).toHaveBeenCalledTimes(0);
    instance.clockOut();
    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(values);
  });
  it(`should call history.push with /type/analyze on this.analze`, () => {
    const values = `/${props.type}/${routes.ANALYZE}`;
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.push).toHaveBeenCalledTimes(0);
    expect(props.clearFilters).not.toHaveBeenCalled();
    instance.analyze();
    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(values);
    expect(props.clearFilters).toHaveBeenCalled();
  });
  it(`should call history.push with /type/export on this.export`, () => {
    const values = `/${props.type}/${routes.EXPORT}`;
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.history.push).toHaveBeenCalledTimes(0);
    instance.export();
    expect(props.history.push).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith(values);
  });
});
