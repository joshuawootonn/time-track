import React from 'react';
import { shallow } from 'enzyme';

import { Export } from 'components/forms/Export/export';
import ExportHOC from 'components/forms/Export';

const props =  {  
  classes: {},
  isSubmitting: true,
  values: {
    fileLocation: `123`
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

describe(`Export Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
});