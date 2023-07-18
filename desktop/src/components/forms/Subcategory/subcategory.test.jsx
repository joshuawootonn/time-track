import React from 'react';
import { shallow } from 'enzyme';

import { Subcategory } from '~/components/forms/Subcategory/subcategory';
import SubcategoryHOC from '~/components/forms/Subcategory';

const props = {
  classes: {},
  isSubmitting: true,
  type: `edit`,
  initialValues: {},
  label: `label`,
  removeSubcategory: jest.fn(),
  categories: [{ id: 1 }],
  setFieldValue: jest.fn(),
  resetForm: jest.fn(),
  errors: {}
};

const setup = overRides => {
  return shallow(<Subcategory {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return shallow(<SubcategoryHOC {...props} {...overRides} />);
};

describe(`Subcategory Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should resetForm when #subcategory-reset-button is clicked`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    instance.resetForm = jest.fn();
    expect(props.resetForm).toHaveBeenCalledTimes(0);
    wrapper
      .find(`#subcategory-reset-button`)
      .first()
      .simulate(`click`);
    expect(props.resetForm).toHaveBeenCalledTimes(1);
  });
});
