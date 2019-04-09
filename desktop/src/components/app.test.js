import React from 'react';
import { shallow } from 'enzyme';

import App,{ AuthedRoutes } from 'app';

const props = {};

const setup = () => {  
  return shallow(<AuthedRoutes {...props} />);    
};

const setupHOC = () => {
  return shallow(<App {...props} />);
};

describe(`App`, () => {
  it(`should render correctly`, () => {
    setup();        
  });
  it(`should render correctly withRouter`, () => {
    setupHOC();    
  });
});