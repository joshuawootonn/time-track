import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VirtualizedSortSelect from 'components/tables/Table';
import Progress from 'components/helpers/Progress';

import { analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';

import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ShiftIndex extends Component { 
  
  selectLabel = selected =>`${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

  select = object => {    
    this.props.select(domain.SHIFT,object);
  }

  add = () => this.props.setStatus(domain.SHIFT,analyzeStatus.ADDING)

  render() {
    const { shifts, selected } = this.props;
    if (!shifts) return <Progress variant="circular" fullWidth fullHeight />;
    
    return ( 
      <VirtualizedSortSelect
        data={shifts || []}
        columns={rows} 
        selected={selected}
        select={this.select}
        initialSortBy="clockInDate"     
      /> 
    );
  }
}

ShiftIndex.propTypes = {
  shifts: PropTypes.array,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object
};

/* istanbul ignore next */
const mapStateToProps = state => {
  const filters = state.analyze.shiftFilters;
  return {
    shifts: shiftSelectors.getAllShiftsNew(state, { filters , sorts: {} }),
    selected: shiftSelectors.getSelectedShift(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {    
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftIndex);

const rows = [
  {
    id: `firstName`, 
    dataKey: `employee`,
    width: 150, 
    height: 56,
    padding: `dense`,
    label: `First Name`,
    type: TableDataTypes.OBJECT,
    keys: [`firstName`]
  },
  {
    id: `lastName`, 
    dataKey: `employee`,   
    width: 150,   
    height: 56,
    padding: `dense`,
    label: `Last Name`,
    type: TableDataTypes.OBJECT,
    keys: [`lastName`]
  },
  {
    id: `clockInDate`,  
    dataKey: `clockInDate`,  
    width: 200,   
    height: 56,
    padding: `dense`,
    label: `Clock In`,
    type: TableDataTypes.DATETIME
  },
  {
    id: `clockOutDate`, 
    dataKey: `clockOutDate`, 
    width: 200,  
    height: 56,  
    padding: `dense`,
    label: `Clock Out`,
    type: TableDataTypes.DATETIME
  },
  {
    id: `length`,    
    dataKey: `length`,  
    width: 120, 
    height: 56,
    padding: `dense`,
    label: `Length`,
    type: TableDataTypes.LENGTH
  }
];