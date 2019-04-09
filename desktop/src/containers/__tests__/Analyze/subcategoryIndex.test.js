import React from 'react';
import { mount } from 'enzyme';

import { SubcategoryIndex } from 'containers/Analyze/subcategoryIndexContainer';
import domain from 'constants/domains';
import { analyzeStatus } from 'constants/analyze';


const props =  {  
  selected: { id: 1,type: `Subcategory` },
  select: jest.fn(),
  subcategories:[{ id: 1 },{ id: 2 }],
  setStatus: jest.fn(),
  getAllSubcategories: jest.fn()
    .mockImplementationOnce(() => Promise.resolve())
};

const setup = overRides => {  
  return mount(<SubcategoryIndex {...props} {...overRides}/>);    
};


describe(`Subcategory Index Container`, () => {  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();       
  });
  it(`should generate a proper label on this.selectLabel`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const value = instance.selectLabel(props.selected);
    expect(value).toEqual(`Subcategory selected`);
  });
  it(`should call props.select on this.select`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.select({ id: 1 });
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(domain.SUBCATEGORY,{ id: 1 });
  });
  it(`should call props.setStatus on this.add`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.setStatus).toHaveBeenCalledTimes(0);
    instance.add({ id: 1 });
    expect(props.setStatus).toHaveBeenCalledTimes(1);
    expect(props.setStatus).toHaveBeenCalledWith(domain.SUBCATEGORY,analyzeStatus.ADDING);
  });
});