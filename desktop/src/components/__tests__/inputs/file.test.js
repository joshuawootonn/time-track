import React from 'react';
import { mount } from 'enzyme';

import { File } from 'components/inputs/File/file';
import FileHOC from 'components/inputs/File';

const props =  {  
  form:{
    errors: {},
    setFieldValue: jest.fn()
  },
  field: {
    name: 'name'
  },
  label: 'label',
  labelProps: {},
  formControlProps: {},
  margin: 'normal',
  classes: {},
  helper: 'normal',
  fullWidth: true
};

const setup = overRides => {  
  return mount(<File {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return mount(<FileHOC {...props} {...overRides}/>);
};

describe('File Input', () => {
  it('should render correctly', () => {
    setup();        
  });
  it('should render correctly withStyles', () => {
    setupHOC();       
  });
  it('should call setFieldValue on this.fileChange', () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.form.setFieldValue).toHaveBeenCalledTimes(0);
    instance.fileChange({ target:{ files:[{ path:'path' }] } });
    expect(props.form.setFieldValue).toHaveBeenCalledTimes(1);
    expect(props.form.setFieldValue).toHaveBeenCalledWith('name','path');
  });
 
});