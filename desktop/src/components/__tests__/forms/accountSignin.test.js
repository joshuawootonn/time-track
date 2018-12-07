import React from 'react';
import { shallow } from 'enzyme';

import { AccountSigin } from 'components/forms/AccountSigin/accountSigin';
import AccountSiginHOC from 'components/forms/AccountSigin';

const props =  {  
  classes: {},
  isSubmitting: true,
  values: {
    pin: '123'
  },
  setFieldValue: jest.fn(),
  errors: {}
};

const setup = overRides => {  
  return shallow(<AccountSigin {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<AccountSiginHOC {...props} {...overRides}/>);
};

describe('Account Signin Component', () => {
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
  it('should call setFieldValue in resetPin', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setFieldValue).toHaveBeenCalledTimes(0);
    instance.resetPin();
    expect(props.setFieldValue).toHaveBeenCalledTimes(1);
  });
  it('should call setFieldValue in appendPin', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setFieldValue).toHaveBeenCalledTimes(0);
    instance.appendPin('1');
    expect(props.setFieldValue).toHaveBeenCalledTimes(1);
  });
  it('should not appendPin if pin.length > 6', () => {
    const wrapper = setup({ values: { pin: '111111' } });    
    const instance = wrapper.instance();
    expect(props.setFieldValue).toHaveBeenCalledTimes(0);
    instance.appendPin('1');
    expect(props.setFieldValue).toHaveBeenCalledTimes(0);
    expect(instance.props.values.pin).toEqual('111111');
  });
  it('should appendPin(1) when #button-1 is clicked', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.appendPin = jest.fn();
    expect(instance.appendPin).toHaveBeenCalledTimes(0);
    wrapper.find('#button-1').first().simulate('click');
    expect(instance.appendPin).toHaveBeenCalledTimes(1);
  });
  it('should disable to submit button if errors is not empty', () => {
    const wrapper = setup({ errors: { asdf: 'asdf' } });
    expect(wrapper).toMatchSnapshot();
  });
});