import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import { SortSelectTable } from '~/components/tables/SortSelect/sortSelectTable';
import SortSelectTableHOC from '~/components/tables/SortSelect';
import * as TableDataTypes from '~/constants/tableDataTypes';

import SortSelectHeadHOC, {
  SortSelectHead
} from '~/components/tables/SortSelect/head';
import SortSelectToolbarHOC, {
  SortSelectToolbar
} from '~/components/tables/SortSelect/tool';

const props = {
  classes: {},
  label: `label`,
  add: jest.fn(),
  headerData: [{ id: `qwer`, numeric: true, padding: `dense`, label: `label` }],
  tableData: [{ id: 1, qwer: `asdf` }],
  selected: { id: 1, qwer: `asdf` },
  select: jest.fn(),
  selectLabel: jest.fn()
};

const setup = overRides => {
  return mount(<SortSelectTable {...props} {...overRides} />);
};

const setupHOC = overRides => {
  return mount(<SortSelectTableHOC {...props} {...overRides} />);
};

describe(`Sort Select Table Component`, () => {
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
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.NUMBER
        }
      ],
      tableData: [{ id: 1, qwer: 12 }]
    });
  });
  it(`should render correctly with boolean based type`, () => {
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.BOOLEAN
        }
      ],
      tableData: [{ id: 1, qwer: `true` }]
    });
  });
  it(`should render correctly with string based type`, () => {
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.STRING
        }
      ],
      tableData: [{ id: 1, qwer: `true` }]
    });
  });
  it(`should render correctly with object based type`, () => {
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.OBJECT,
          keys: [`name`]
        }
      ],
      tableData: [{ id: 1, qwer: { name: `asdf` } }]
    });
  });
  it(`should render correctly with date based type`, () => {
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.DATE
        }
      ],
      tableData: [{ id: 1, qwer: moment().toISOString() }]
    });
  });
  it(`should render correctly with datetime based type`, () => {
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.DATETIME
        }
      ],
      tableData: [{ id: 1, qwer: moment().toISOString() }]
    });
  });
  it(`should render correctly with length based type`, () => {
    setup({
      headerData: [
        {
          id: `qwer`,
          numeric: true,
          padding: `dense`,
          label: `label`,
          type: TableDataTypes.LENGTH
        }
      ],
      tableData: [{ id: 1, qwer: 50 }]
    });
  });
  it(`should create appropriate sort handler`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    let val = instance.desc({ asdf: 1 }, { asdf: 0 }, `asdf`, `asdf`, null);
    expect(val).toEqual(-1);
    val = instance.desc({ asdf: -1 }, { asdf: 0 }, `asdf`, `asdf`, null);
    expect(val).toEqual(1);
    val = instance.desc({ asdf: 0 }, { asdf: 0 }, `asdf`, `asdf`, null);
    expect(val).toEqual(0);
    val = instance.desc(
      { asdf: { qwer: 1 } },
      { asdf: { qwer: 0 } },
      `asdf`,
      TableDataTypes.OBJECT,
      [`qwer`]
    );
    expect(val).toEqual(-1);
    val = instance.desc(
      { asdf: { qwer: -1 } },
      { asdf: { qwer: 0 } },
      `asdf`,
      TableDataTypes.OBJECT,
      [`qwer`]
    );
    expect(val).toEqual(1);
    val = instance.desc(
      { asdf: { qwer: 0 } },
      { asdf: { qwer: 0 } },
      `asdf`,
      TableDataTypes.OBJECT,
      [`qwer`]
    );
    expect(val).toEqual(0);
  });
  it(`stable sort`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    const array = [{ asdf: 1 }, { asdf: 1 }, { asdf: 0 }];
    const sorter = instance.getSorting(`asc`, `asdf`, `asdf`, null);
    const newArray = instance.stableSort(array, sorter);
    expect(newArray).toEqual([{ asdf: 0 }, { asdf: 1 }, { asdf: 1 }]);
  });
  it(`should return sort based on "desc" or "asc" by this.getSorting`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    let val = instance.getSorting(
      `asc`,
      `asdf`,
      `asdf`,
      null
    )({ asdf: -1 }, { asdf: 0 });
    expect(val).toEqual(-1);
    val = instance.getSorting(
      `desc`,
      `asdf`,
      `asdf`,
      null
    )({ asdf: -1 }, { asdf: 0 });
    expect(val).toEqual(1);
  });
  it(`handleRequestSort`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    wrapper.setState({ order: `desc`, orderBy: `asdf` });
    instance.handleRequestSort(null, `asdf`, null, null);
    expect(wrapper.state(`order`)).toEqual(`asc`);
    expect(wrapper.state(`orderBy`)).toEqual(`asdf`);
    wrapper.setState({ order: `asc` });
    instance.handleRequestSort(null, `asdf`, null, null);
    expect(wrapper.state(`order`)).toEqual(`desc`);
    expect(wrapper.state(`orderBy`)).toEqual(`asdf`);
  });
  it(`should handleClick on this.handleClick`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(props.select).toHaveBeenCalledTimes(0);
    instance.handleClick(null, 1);
    expect(props.select).toHaveBeenCalledTimes(1);
    expect(props.select).toHaveBeenCalledWith(1);
  });
  it(`should indicate selected by this.isSelected`, () => {
    const wrapper = setup();
    const instance = wrapper.instance();
    expect(instance.isSelected(1)).toBeTruthy();
  });

  it(`should call this.handleClick on row clickage`, () => {
    const wrapper = setup();
    wrapper
      .find(`#row-0`)
      .last()
      .simulate(`click`);
  });
});

const headProps = {
  rowCount: 5,
  headerData: [{ id: 1, numeric: true, padding: `dense`, label: `label` }],
  selected: { id: 1, qwer: { name: `asdf` } },
  onRequestSort: jest.fn(),
  order: `asc`,
  orderBy: `qwer`,
  type: TableDataTypes.OBJECT,
  keys: [`name`]
};

const setupHead = () => {
  return mount(
    <table>
      <SortSelectHead {...headProps} classes={{}} />
    </table>
  );
};

const setupHeadHOC = () => {
  return mount(
    <table>
      <SortSelectHeadHOC {...headProps} />
    </table>
  );
};

describe(`Sort Select Head Component`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`should render correctly`, () => {
    setupHead();
  });
  it(`should render correctly withStyles`, () => {
    setupHeadHOC();
  });
  it(`should create appropriate sort handler`, () => {
    const wrapper = setupHead();
    const instance = wrapper
      .find(`SortSelectHead`)
      .first()
      .instance();
    expect(headProps.onRequestSort).toHaveBeenCalledTimes(0);
    instance.createSortHandler(`a`, `b`, `c`)({ event: `asdf` });
    expect(headProps.onRequestSort).toHaveBeenCalledTimes(1);
    expect(headProps.onRequestSort).toHaveBeenCalledWith(
      { event: `asdf` },
      `a`,
      `b`,
      `c`
    );
  });
});

describe(`Sort Select Toolbar Component`, () => {
  it(`should render correctly`, () => {
    const props = {
      classes: {},
      add: jest.fn(),
      label: `label`,
      selectLabel: jest.fn(),
      selected: { id: 1, qwer: { name: `asdf` } }
    };
    mount(<SortSelectToolbar {...props} />);
  });
  it(`should render correctly withStyles`, () => {
    const props = {
      classes: {},
      add: jest.fn(),
      label: `label`,
      selectLabel: jest.fn(),
      selected: { id: 1, qwer: { name: `asdf` } }
    };
    mount(<SortSelectToolbarHOC {...props} />);
  });
});
