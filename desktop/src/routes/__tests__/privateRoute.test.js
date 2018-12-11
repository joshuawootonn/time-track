import React from 'react';
import { shallow } from 'enzyme';

import PrivateRouteHOC, { PrivateRoute } from 'routes/privateRoute';
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

const setupHOC = overRides => {
  return shallow(<PrivateRouteHOC {...props} {...overRides} />);
};

describe('Private Route', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const Render = wrapper.prop('render');
    shallow(<Render />)
    expect(wrapper).toMatchSnapshot();
  });
  it('should redirect if user.state != status.SUCCESS', () => {
    const wrapper = setup({user: {status: status.FAILURE}});
    const Render = wrapper.prop('render');
    shallow(<Render />)
    expect(wrapper).toMatchSnapshot();
  })
  // it('should render correctly with connect wrapper', () => {
  //   const wrapper = setupHOC();
  // });
});