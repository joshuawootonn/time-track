import React from 'react';
import { shallow } from 'enzyme';

import { SnackRoot } from 'containers/Floaters/snackRootContainer';

const props =  {  
  snackType: `asdf`,
  snackMessage: `asdf`
};

const setup = overRides => {  
  return shallow(<SnackRoot {...props} {...overRides}/>);    
};

describe(`Snack Root Container`, () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();       
  });  
  it(`should return null when snack message is null`, () => {
    const wrapper =  setup({ snackMessage: null });
    const instance = wrapper.instance();
    expect(instance.render()).toBeNull();
  });
  it(`should return null when snack type is null`, () => {
    const wrapper = setup({ snackType: null });
    const instance = wrapper.instance();
    expect(instance.render()).toBeNull();
  });
});