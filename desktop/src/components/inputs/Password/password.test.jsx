import React from 'react';
import { mount } from 'enzyme';

import { Password } from '~/components/inputs/Password/password';
import PasswordHOC from '~/components/inputs/Password';

const props = {
  form: {
    errors: {}
  },
  field: {
    name: `name`
  },
  label: `label`,
  labelProps: {},
  formControlProps: {},
  margin: `normal`,
  classes: {},
  helper: `normal`,
  fullWidth: true
};

const setup = overRides => {
  return mount(<Password {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return mount(<PasswordHOC {...props} {...overRides} />);
};

describe(`Password Input`, () => {
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
});
