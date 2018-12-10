import React from 'react';
import { shallow } from 'enzyme';
import Index from 'routes/index';

describe('Index Route', () => { 
  it('should be an array with 4 element', () => {
    expect(Index).toBeDefined();
    expect(Index.length).toEqual(4);
  });
  it('should have a valid component, a path on each route, and valid routes ', () => {
    const routeRegex = /^\/$|((\/)\w+)+/;
    Index.forEach(route => {
      expect(route.path.match(routeRegex)).not.toBeNull();
      shallow(<route.component routes={route.routes} type={route.type}/>);
      route.routes.forEach(subroute => {
        expect(subroute.path.match(routeRegex)).not.toBeNull();
        shallow(<subroute.component type={subroute.type}/>);
      })
    });
  });
});