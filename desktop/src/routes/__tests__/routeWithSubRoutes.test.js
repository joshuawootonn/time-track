import React from 'react';
import { shallow } from 'enzyme';
import RouteWithSubRoute from 'routes/routeWithSubRoutes';
import Hero from 'components/layouts/Hero';

describe('Route With Sub Route', () => { 
  it('should render without error', () => {
    shallow(<RouteWithSubRoute routes={{ path: '/asdf',exact: true,component:Hero }}/>);
  });
});