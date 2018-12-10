import React from 'react';
import { shallow } from 'enzyme';
import Admin from 'routes/Admin';

describe('Admin Routes', () => { 
  it('should be an array with 4 element', () => {
    expect(Admin).toBeDefined();
    expect(Admin.length).toEqual(4);
  });
  it('should have a valid component and path on each route', () => {
    const routeRegex = /^\/$|((\/)\w+)+/;
    Admin.forEach(route => {
      expect(route.path.match(routeRegex)).not.toBeNull();
      shallow(<route.component type={route.type} />);
    });
  });
});