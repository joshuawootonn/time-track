import React from 'react';
import { shallow } from 'enzyme';
import Employee from '~/routes/Employee';

describe(`Employee Routes`, () => {
  it(`should be an array with 2 element`, () => {
    expect(Employee).toBeDefined();
    expect(Employee.length).toEqual(2);
  });
  it(`should have a valid component and path on each route`, () => {
    const routeRegex = /^\/$|((\/)\w+)+/;
    Employee.forEach(route => {
      expect(route.path.match(routeRegex)).not.toBeNull();
      shallow(<route.component type={route.type} />);
    });
  });
});
