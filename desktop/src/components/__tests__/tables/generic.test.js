import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import { GenericTable } from 'components/tables/Generic/genericTable';
import GenericTableHOC from 'components/tables/Generic';
import * as TableDataTypes from 'constants/tableDataTypes';

import GenericHeadHOC,  { GenericHead } from 'components/tables/Generic/head';
import GenericToolbarHOC,  { GenericToolbar } from 'components/tables/Generic/tool';

const props =  {  
  classes: {},
  label: `label`,
  edit: jest.fn(),
  add: jest.fn(),
  remove: jest.fn(),
  headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label` }],
  tableData: [{ id: 1, qwer: `asdf` }]
};

const setup = overRides => {  
  return mount(<GenericTable {...props} {...overRides}/>);    
};

const setupHOC = overRides => {
  return mount(<GenericTableHOC {...props} {...overRides}/>);
};

describe(`Generic Table Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setup();
  });
  it(`should render correctly withStyles`, () => {
    setupHOC();
  });
  it(`should render correctly with number based type`, () => {   
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.NUMBER }], tableData: [{ id: 1, qwer: 12 }] });
  });
  it(`should render correctly with boolean based type`, () => {
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.BOOLEAN }], tableData: [{ id: 1, qwer: `true` }] });
  });
  it(`should render correctly with string based type`, () => {
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.STRING }], tableData: [{ id: 1, qwer: `true` }] });
  });
  it(`should render correctly with object based type`, () => {
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.OBJECT,keys: [`name`] }], tableData: [{ id: 1, qwer: { name: `asdf` } }]  });   
  });
  it(`should render correctly with date based type`, () => {
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.DATE }], tableData: [{ id: 1, qwer: moment().toISOString() }]  });    
  });
  it(`should render correctly with datetime based type`, () => {
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.DATETIME }], tableData: [{ id: 1, qwer: moment().toISOString() }]  });    
  });
  it(`should render correctly with length based type`, () => {
    setup({ headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label`,type: TableDataTypes.LENGTH }], tableData: [{ id: 1, qwer: 50 }]  });
  });
});

describe(`Generic Head Component`, () => {
  it(`should render correctly`, () => {
    const props = { rowCount: 5, headerData: [{ id: 1, numeric: true, padding: `dense`, label: `label` }] };
    mount(<table><GenericHead {...props} /></table>);
  });
  it(`should render correctly withStyles`, () => {
    const props = { rowCount: 5, headerData: [{ id: 1, numeric: true, padding: `dense`, label: `label` }] };
    mount(<table><GenericHeadHOC {...props} /></table>);
  });
});

describe(`Generic Toolbar Component`, () => {
  it(`should render correctly`, () => {
    const props = { classes: {},add: jest.fn(),edit: jest.fn(), remove: jest.fn(),label: `label` };
    mount(<GenericToolbar {...props} />);    
  });
  it(`should render correctly withStyles`, () => {
    const props = { classes: {},add: jest.fn(),edit: jest.fn(), remove: jest.fn(),label: `label` };
    mount(<GenericToolbarHOC {...props} />);
  });
});