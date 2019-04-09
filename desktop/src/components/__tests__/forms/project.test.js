import React from 'react';
import { shallow } from 'enzyme';
import { FieldArray } from 'formik';

import { Project } from 'components/forms/Project/project';
import ProjectHOC from 'components/forms/Project';

const props =  {  
  classes: {},
  label: `label`,
  type: `edit`,
  removeProject: jest.fn(),
  categories: [{ id: 0 },{ id: 1 },{ id: 2 }],
  subcategories: [{ id: 0 },{ id: 1 },{ id: 2 }],
  tasks: [{ id: 0,category: { id: 0,name: `name0` }, subcategory: { id: 0,name: `name0` } },{ id: 1,category: { id: 1,name: `name1` }, subcategory: { id: 1,name: `name1` } },{ id: 2,category: { id: 2,name: `name2` }, subcategory: { id: 2,name: `name2` } }],
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  values: {
    projectTasks: [{ id: 0, categoryId: 0, subcategoryId: 0,taskId:0 },{ id: 1, categoryId: 1, subcategoryId: 1,taskId:1 }]
  },
  errors: {}
};

const renderProps = { 
  remove: jest.fn(),
  push: jest.fn(),
  form: {
    setFieldValue: jest.fn()
  }
};

const setup = overRides => {  
  return shallow(<Project {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<ProjectHOC {...props} {...overRides}/>);
};

const setupWithRender = overRides => {
  const wrapper = setup();  
  const Render = wrapper.find(FieldArray).first().prop(`render`);  
  return shallow(<Render {...renderProps} {...overRides} />);
};

describe(`Project Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();    
  });
  it(`should call render of projectTask fieldarray`, () => {
    setupWithRender();
  });

  it(`should call onChange Category Field`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(0);
    wrapper.find(`#category-field-1`).first().simulate(`change`);
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(2);
    expect(renderProps.form.setFieldValue).toHaveBeenLastCalledWith(`projectTasks.1.taskId`,-1);
  });
  it(`should call onChange Category Field`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(0);
    wrapper.find(`#subcategory-field-1`).first().simulate(`change`);
    expect(renderProps.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(renderProps.form.setFieldValue).toHaveBeenCalledWith(`projectTasks.1.taskId`,-1);
  });
  it(`should remove an projectTask when a remove-projectTask-1`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.remove).toHaveBeenCalledTimes(0);
    wrapper.find(`#remove-projectTask-1`).first().simulate(`click`);
    expect(renderProps.remove).toHaveBeenCalledTimes(1);
    expect(renderProps.remove).toHaveBeenCalledWith(1);
  });
  it(`should remove an projectTask when a remove-projectTask-1`, () => {
    const wrapper = setupWithRender();
    expect(renderProps.push).toHaveBeenCalledTimes(0);
    wrapper.find(`#add-projectTask`).first().simulate(`click`);
    expect(renderProps.push).toHaveBeenCalledTimes(1);
    expect(renderProps.push).toHaveBeenCalledWith({
      categoryId: -1,
      subcategoryId: -1,
      taskId: -1,
      quantity: 1,
      estimateTime: 1
    });
  });
  it(`should call resetForm on Reset button click`, () => {
    const wrapper = setup();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper.find(`#project-reset-button`).first().simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
    expect(props.resetForm).toHaveBeenCalledWith({});
  });
});