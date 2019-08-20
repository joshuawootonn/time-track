import React from 'react';
import { shallow } from 'enzyme';
import Manager from 'routes/Manager';

describe(`Manager Routes`, () => {
  it(`should be an array with 3 element`, () => {
    expect(Manager).toBeDefined();
    expect(Manager.length).toEqual(3);
  });
  it(`should have a valid component and path on each route`, () => {
    const routeRegex = /^\/$|((\/)\w+)+/;
    Manager.forEach(route => {
      expect(route.path.match(routeRegex)).not.toBeNull();
      shallow(<route.component type={route.type} />);
    });
  });
});
