import React from 'react';
import { shallow } from 'enzyme';

import { Project } from 'components/forms/Project/project';
import ProjectHOC from 'components/forms/Project';

const props =  {  
  classes: {},
  label: 'label',
  type: 'edit',
  removeProject: jest.fn(),
  categories: [{ id: 0 },{ id: 1 },{ id: 2 }],
  subcategories: [{ id: 0 },{ id: 1 },{ id: 2 }],
  tasks: [{ id: 0 },{ id: 1 },{ id: 2 }],
  isSubmitting: true,
  resetForm: jest.fn(),
  initialValues: {},
  values: {
    projectTasks: [{ categoryId: 1, subcategoryId: 1,taskId:1 }]
  },
  errors: {}
};

const setup = overRides => {  
  return shallow(<Project {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<ProjectHOC {...props} {...overRides}/>);
};

describe('Project Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();    
  });
  it('should render correctly withStyles', () => {
    const wrapper = setupHOC();
    expect(wrapper).toMatchSnapshot();
  });
  // it('should call setFieldValue in resetPin', () => {
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   expect(props.setFieldValue).toHaveBeenCalledTimes(0);
  //   instance.resetPin();
  //   expect(props.setFieldValue).toHaveBeenCalledTimes(1);
  // });
  // it('should call setFieldValue in appendPin', () => {
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   expect(props.setFieldValue).toHaveBeenCalledTimes(0);
  //   instance.appendPin('1');
  //   expect(props.setFieldValue).toHaveBeenCalledTimes(1);
  // });
  // it('should not appendPin if pin.length > 6', () => {
  //   const wrapper = setup({ values: { pin: '111111' } });    
  //   const instance = wrapper.instance();
  //   expect(props.setFieldValue).toHaveBeenCalledTimes(0);
  //   instance.appendPin('1');
  //   expect(props.setFieldValue).toHaveBeenCalledTimes(0);
  //   expect(instance.props.values.pin).toEqual('111111');
  // });
  // it('should appendPin(1) when #button-1 is clicked', () => {
  //   const wrapper = setup();
  //   const instance = wrapper.instance();
  //   instance.appendPin = jest.fn();
  //   expect(instance.appendPin).toHaveBeenCalledTimes(0);
  //   wrapper.find('#button-1').first().simulate('click');
  //   expect(instance.appendPin).toHaveBeenCalledTimes(1);
  // });
  // it('should disable to submit button if errors is not empty', () => {
  //   const wrapper = setup({ errors: { asdf: 'asdf' } });
  //   expect(wrapper).toMatchSnapshot();
  // });
});