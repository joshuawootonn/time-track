import React from 'react';
import { mount } from 'enzyme';

import { EmployeeToolbar } from '~/containers/Employee/employeeToolbar.container';

import domain from '~/constants/domains';
import { analyzeStatus } from '~/constants/analyze';
import { EMPLOYEE_MOCK } from '~/constants/modelMocks';

const props = {
  selected: EMPLOYEE_MOCK[0],
  select: jest.fn(),
  setStatus: jest.fn(),
  toggleEmployeeFilter: jest.fn(),
  employeeFilterVisible: true
};

const setup = overRides => {
  return mount(<EmployeeToolbar {...props} {...overRides} />);
};

describe(`Employee Toolbar Container`, () => {
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
    expect(value).toEqual(`Joshua Wootonn selected`);
  });
  it(`should call props.setStatus on this.add`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(
      domain.EMPLOYEE,
      analyzeStatus.ADDING
    );
  });
});
