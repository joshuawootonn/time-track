import React from 'react';
import { shallow } from 'enzyme';
import Account from 'routes/Account';

describe(`Account Routes`, () => { 
  it(`should be an array with 1 element`, () => {
    expect(Account).toBeDefined();
    expect(Account.length).toEqual(1);
  });
  it(`should have a valid component and path on each route`, () => {
    const routeRegex = /^\/$|((\/)\w+)+/;
    Account.forEach(route => {
      expect(route.path.match(routeRegex)).not.toBeNull();
      shallow(<route.component />);
    });
  });
});