import React from 'react';
import { shallow } from 'enzyme';

import Export from '~/scenes/Export/export';

const props = {
  type: `type`
};

const setup = overRides => {
  return shallow(<Export {...props} {...overRides} />);
};

describe(`Export Scene`, () => {
  it(`should render correctly`, () => {
    setup();
  });
});
