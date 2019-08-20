import React from 'react';
import { shallow } from 'enzyme';

import { SnackContainer } from 'containers/Floaters/snackContainer';
import * as status from 'constants/status';

const props = {
  message: `message`,
  type: status.SUCCESS,
  onClose: jest.fn()
};

const setup = overRides => {
  return shallow(<SnackContainer {...props} {...overRides} />);
};

describe(`Snack Container`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly for failure status`, () => {
    setup({ type: status.FAILURE });
  });
  it(`should return correctly for no status`, () => {
    setup({ type: `` });
  });
});
