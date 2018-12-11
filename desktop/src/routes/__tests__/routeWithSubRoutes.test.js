import React from 'react';
import { shallow } from 'enzyme';
import RouteWithSubRoute from 'routes/routeWithSubRoutes';
import Hero from 'components/layouts/Hero';

describe('Route With Sub Route', () => { 
  it('should render without error', () => {    
    const route = { path: '/asdf',exact: true,component:Hero };
    shallow(<RouteWithSubRoute {...route}/>);
  });
  it('should render the child component without error', () => {
    const route = { path: '/asdf',exact: true,component:Hero };
    const outer = shallow(<RouteWithSubRoute {...route}/>);
    const Renderer = outer.prop('render');
    shallow(<Renderer />);
  });
});