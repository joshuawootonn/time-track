import React from 'react';
import { mount } from 'enzyme';

import { TaskIndex } from 'containers/Task/taskIndex.container';

import Progress from 'components/helpers/Progress';

import domain from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';

const tasks = [
  {
    id: 1,
    isActive: 1,
    name: `7" Sidewalk`,
    subcategoryId: 1,
    subcategory: { categoryId: 2, id: 1, type: `Sidewalk`, dimensionId: 1 },
    category: { id: 2, type: `PCC` },
    dimension: { id: 1, type: `SF` }
  },
  {
    id: 2,
    isActive: 1,
    name: `6" Sidewalk`,
    subcategoryId: 1,
    subcategory: { categoryId: 2, id: 1, type: `Sidewalk`, dimensionId: 1 },
    category: { id: 2, type: `PCC` },
    dimension: { id: 1, type: `SF` }
  }
];
const props = {
  selected: tasks[0],
  select: jest.fn(),
  tasks,
  setStatus: jest.fn(),
  getAllTasks: jest.fn().mockImplementationOnce(() => Promise.resolve())
};

const setup = overRides => {
  return mount(<TaskIndex {...props} {...overRides} />);
};

describe(`Task Index Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render loader if projects falsey`, () => {
    const wrapper = setup({ tasks: null });
    expect(wrapper.find(Progress).length).toBeGreaterThan(0);
  });
  it(`should generate a proper label on this.selectLabel`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel(props.selected);
    expect(value).toEqual(`7" Sidewalk selected`);
  });
  it(`should call props.select on this.select`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.select({ id: 1 });
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(domain.TASK, { id: 1 });
  });
  it(`should call props.setStatus on this.add`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(
      domain.TASK,
      analyzeStatus.ADDING
    );
  });
});
