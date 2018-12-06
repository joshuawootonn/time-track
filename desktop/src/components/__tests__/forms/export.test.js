import React from 'react';
import { shallow } from 'enzyme';

import { Export } from 'components/forms/Export/export';
import ExportHOC from 'components/forms/Export';

const props =  {  
  classes: {},
  isSubmitting: true,
  values: {
    fileLocation: '123'
  },
  cancel: jest.fn(),
  errors: {}
};

const setup = overRides => {  
  return shallow(<Export {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return shallow(<ExportHOC {...props} {...overRides}/>);
};

describe.skip('Export Component', () => {
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
});