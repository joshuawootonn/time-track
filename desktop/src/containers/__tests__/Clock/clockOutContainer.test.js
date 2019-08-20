import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';
import moment from 'moment';

import { ClockOut } from 'containers/Clock/clockOutContainer';
import Progress from 'components/helpers/Progress';

import {
  EMPLOYEE_MOCK,
  PROJECT_MOCK,
  PROJECT_TASK_MOCK,
  COMPLETE_SHIFT_MOCK,
  PROJECT_TASK_OBJECT_MOCK
} from 'constants/modelMocks';

const props = {
  currentShift: {
    clockInDate: moment
      .utc()
      .subtract(7, `hours`)
      .toString(),
    clockOutDate: null,
    employeeId: 2,
    id: 9,
    length: null,
    lunch: null,
    activities: [],
    employee: {
      authorityId: 1,
      crewId: 1,
      firstName: `Joshua`,
      id: 2,
      isEmployed: 1,
      isWorking: 1,
      lastName: `Wootonn`,
      pin: 565656
    }
  },
  lastWeeksShifts: COMPLETE_SHIFT_MOCK,
  projects: PROJECT_MOCK,
  projectTasks: PROJECT_TASK_MOCK,
  projectTaskObjects: PROJECT_TASK_OBJECT_MOCK,
  currentEmployee: EMPLOYEE_MOCK[0],
  getCurrentShift: jest.fn(),
  clockOut: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(new Error())),
  history: {
    push: jest.fn(),
    goBack: jest.fn()
  }
};

const formikFunctions = {
  resetForm: jest.fn(),
  setStatus: jest.fn(),
  setSubmitting: jest.fn(),
  setErrors: jest.fn()
};

const setup = overRides => {
  return mount(<ClockOut {...props} {...overRides} />);
};

describe(`ClockOut Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly if status === INIT`, () => {
    setup();
  });
  it(`should call this.props.getCurrentShift on componentDidMount`, () => {
    expect(props.getCurrentShift).toHaveBeenCalledTimes(0);
    setup();
    expect(props.getCurrentShift).toHaveBeenCalledTimes(1);
  });
  it(`should call this.props.history.push from this.cancel`, () => {
    const wrapper = setup();
    expect(props.history.push).toHaveBeenCalledTimes(0);
    wrapper.instance().cancel();
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });
  it(`should render a loader if currentShift hasn't been fetched yet`, () => {
    const wrapper = setup({ currentShift: null });
    expect(wrapper.find(Progress).length).toBe(1);
  });
  it(
    `should test the onSubmit calls clockOut and onResolve it should history.push(` /
      `)`,
    () => {
      const values = { lunch: 12, activities: {} };
      const wrapper = setup();
      const onSubmit = wrapper
        .find(Formik)
        .first()
        .prop(`onSubmit`);
      expect(props.clockOut).toHaveBeenCalledTimes(0);
      expect(props.history.push).toHaveBeenCalledTimes(0);
      onSubmit(values, formikFunctions).then(() => {
        expect(props.history.push).toHaveBeenCalledTimes(1);
        expect(props.clockOut).toHaveBeenCalledTimes(1);
      });
    }
  );
  it(`should test the onSubmit calls clockOut and onReject doesn't do anything`, () => {
    const values = { lunch: 12, activities: {} };
    const wrapper = setup();
    const onSubmit = wrapper
      .find(Formik)
      .first()
      .prop(`onSubmit`);
    expect(props.clockOut).toHaveBeenCalledTimes(0);
    expect(props.history.push).toHaveBeenCalledTimes(0);
    onSubmit(values, formikFunctions).then(() => {
      expect(props.history.push).toHaveBeenCalledTimes(0);
      expect(props.clockOut).toHaveBeenCalledTimes(1);
    });
  });
});
