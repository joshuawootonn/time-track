import React from 'react';
import { shallow } from 'enzyme';

import { PrivateRoute } from 'routes/privateRoute';
import Hero from 'components/layouts/Hero';
import * as status from 'constants/status';

const props = {
  component: Hero,
  user: {
    status: status.SUCCESS
  },
  location: {}
};
const setup = overRides => {  
  return shallow(<PrivateRoute {...props} {...overRides}/>);
};


describe('Private Route', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const Render = wrapper.prop('render');
    shallow(<Render />);
  });
  it('should redirect if user.state != status.SUCCESS', () => {
    const wrapper = setup({ user: { status: status.FAILURE } });
    const Render = wrapper.prop('render');
    shallow(<Render />);    
  });
});