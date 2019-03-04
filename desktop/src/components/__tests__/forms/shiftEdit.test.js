import React from 'react';
import { shallow } from 'enzyme';
import { FieldArray } from 'formik';

import { ShiftEdit } from 'components/forms/ShiftEdit/shiftEdit';
import ShiftEditHOC from 'components/forms/ShiftEdit';

const props =  {  
  classes: {},
  label: 'label',
  type: 'edit',
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  values: {
    activities: [{ id: 0, categoryId: 0, subcategoryId: 0,taskId:0 },{ id: 1, categoryId: 1, subcategoryId: 1,taskId:1 }]
  },
  projects: [{ id: 0 },{ id: 1 },{ id: 2 }],
  projectTasks: [{ id: 0, task: { id: 0,category: { id: 0,name: 'name0' }, subcategory: { id: 0,name: 'name0' } } },
    { id: 1, task: { id: 1,category: { id: 1,name: 'name1' }, subcategory: { id: 1,name: 'name1' } } },
    { id: 2, task: { id: 2,category: { id: 2,name: 'name2' }, subcategory: { id: 2,name: 'name2' } }  }],
  employees: [{ id: 0 },{ id: 1 },{ id: 2 }],
  timeLeft: 60,
  generalError: 'General Error',
  errors: {
    asdf:{
      
    }
  }
};

const renderProps = { 
  remove: jest.fn(),
  push: jest.fn(),
  form: {
    setFieldValue: jest.fn()
  }
};


const setup = overRides => {  
  return shallow(<ShiftEdit {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<ShiftEditHOC {...props} {...overRides}/>);
};

const setupWithRender = overRides => {
  const wrapper = setup();  
  const Render = wrapper.find(FieldArray).first().prop('render');  
  return shallow(<Render {...renderProps} {...overRides}/>);
};

describe('ShiftEdit Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    setup();        
  });
  it('should render correctly withStyles', () => {
    setupHOC();    
  });
  it('should call render of activites fieldarray', () => {
    setupWithRender();
  });
  it('should call onChange project Field', () => {
    const wrapper = setupWithRender();
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(0);
    wrapper.find('#project-field-1').first().simulate('change');
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(renderProps.form.setFieldValue).toHaveBeenLastCalledWith('activities.1.projectTaskId',-1);
  });  
  it('should remove an activity when a remove-projectTask-1', () => {
    const wrapper = setupWithRender();
    expect(renderProps.remove).toHaveBeenCalledTimes(0);
    wrapper.find('#remove-activity-1').first().simulate('click');
    expect(renderProps.remove).toHaveBeenCalledTimes(1);
    expect(renderProps.remove).toHaveBeenCalledWith(1);
  });
  it('should add a activity when add-activity is clicked', () => {
    const wrapper = setupWithRender();
    expect(renderProps.push).toHaveBeenCalledTimes(0);
    wrapper.find('#add-activity').first().simulate('click');
    expect(renderProps.push).toHaveBeenCalledTimes(1);
    expect(renderProps.push).toHaveBeenCalledWith({
      projectId: '0',
      projectTaskId: -1,
      length: 0,
      description: ''
    });
  });
  it('should call resetForm on Reset button click', () => {
    const wrapper = setup();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find('#shift-edit-reset-button').first().simulate('click');
    expect(props.resetForm).toHaveBeenCalledTimes(1);
    expect(props.resetForm).toHaveBeenCalledWith({});
  });
});