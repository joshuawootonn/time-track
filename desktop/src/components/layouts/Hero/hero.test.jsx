import React from 'react';
import { mount } from 'enzyme';

import Hero from '~/components/layouts/Hero';

const props = {
  classes: {},
  fullPage: false,
  fullHeight: false,
  fullWidth: true,
  children: <div>child</div>
};

const setup = overRides => {
  return mount(<Hero {...props} {...overRides} />);
};

describe(`Hero Component`, () => {
  it(`should render correctly`, () => {
    setup();
  });
});
