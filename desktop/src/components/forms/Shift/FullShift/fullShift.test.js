import React from 'react';
import { mount } from 'enzyme';

import {Formik} from 'formik'

import { FullShift,ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID,ANALYZE_SHIFT_FULL_SHIFT_SUBMIT_BUTTON_ID } from 'components/forms/Shift/FullShift/fullShift';
import FullShiftHOC from 'components/forms/Shift/FullShift';

import {EMPLOYEE_MOCK, PROJECT_MOCK,PROJECT_TASK_MOCK} from 'constants/modelMocks'

const INITIAL_VALUES_ADD = {
  lunch: 30,
  clockInDate: "2019-04-05T07:30",
  clockOutDate: "2019-04-05T07:31",
  employeeId: -1,
  activities: [
    {
      projectId: -1,
      projectTaskId: -1,
      length: 0,
      description: ""
    }
  ]
}

const INTIIAL_VALUES_EDIT = {
  clockInDate: "2019-04-05T02:34",
  clockOutDate: "2019-04-05T06:26",
  employeeId: 76,
  id: 13539,
  length: 232,
  lunch: null,
  activities: [
    {
      description: "",
      id: 33640,
      length: 225,
      projectTaskId: 1,
      shiftId: 13539,
      projectTask: {
        estimateTime: 758,
        id: 1,
        projectId: 1,
        quantity: 1500,
        taskId: 1,
        task: {
          id: 1,
          isActive: 1,
          name: "6\" Driveway",
          subcategoryId: 1,
          subcategory: {
            categoryId: 1,
            id: 1,
            type: "Subcategory Name",
            dimensionId: 1
          },
          category: {
            id: 1,
            type: "Category Name"
          },
          dimension: {
            id: 1,
            type: "Dimension Name"
          }
        },
        project: {
          date: "2017-02-13T00:02:00.000Z",
          id: 1,
          isActive: 0,
          name: "1722: Musc. Co. Fruitland Whitetopping"
        }
      },
      projectId: 1
    }
  ],
  employee: {
    authorityId: 2,
    crewId: 1,
    firstName: "Angel",
    id: 76,
    isEmployed: 1,
    isWorking: 0,
    lastName: "Jacobo",
    pin: 288839
  }
}

const props =  {  
  classes: {},
  isSubmitting: false,
  resetForm: jest.fn(),
  initialValues: INITIAL_VALUES_ADD,
  errors: {},
  projects: PROJECT_MOCK,
  projectTasks: PROJECT_TASK_MOCK,
  employees: EMPLOYEE_MOCK,
  timeLeft: 400,
  generalError: '',  
};

const setup = overRides => {  
  return mount(
    <Formik
      initialValues={INITIAL_VALUES_ADD}
      render={(formikProps) => (
        <FullShift {...formikProps} {...props} {...overRides}/>
      )}
    /> 
  );    
};

const setupHOC = overRides => {
  return mount(
    <Formik
      initialValues={INITIAL_VALUES_ADD}
      render={(formikProps) => (
        <FullShiftHOC {...formikProps} {...props} {...overRides}/>
      )}
    />
  );
};

describe('FullShift Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should mount correctly in add mode', () => {
    setup({initialValues: INITIAL_VALUES_ADD});        
  });
  it('should render correctly withStyles in add mode', () => {
    setupHOC({initialValues: INITIAL_VALUES_ADD});    
  });
  it('should mount correctly in add mode', () => {
    setup({initialValues: INTIIAL_VALUES_EDIT});        
  });
  it('should render correctly withStyles in add mode', () => {
    setupHOC({initialValues: INTIIAL_VALUES_EDIT});    
  });
  it(`should call props.resetForm when #${ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID} is clicked`, () => {
    const wrapper = setup();
    expect(props.resetForm).not.toHaveBeenCalled();
    wrapper.find(`#${ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID}`).first().simulate('click');
    expect(props.resetForm).toHaveBeenCalled();
  })  
});