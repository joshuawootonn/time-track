import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import {isEqualWith, isEqual} from 'lodash'

import { employeeActions, taskActions, projectActions, shiftActions, analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';
import VirtualizedSortSelect from 'components/tables/VirtualizedSortSelect';
import AnalyzeToolbar from 'components/toolbars/AnalyzeToolbar';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ShiftIndex extends Component { 
  
  selectLabel = selected =>`${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

  select = object => this.props.select(domain.SHIFT,object)

  add = () => this.props.setStatus(domain.SHIFT,analyzeStatus.ADDING)

  shouldComponentUpdate(nextProps, nextState){
    if (!isEqual(this.props.selected,nextProps.selected)){
      return true
    }
    const areShiftsTheSame = isEqualWith( this.props.shifts, nextProps.shifts, (a,b) => {      
      if(a === null && b === null){
        return true;
      }else if(a === null || b === null) {
        return false;
      }else if (a.length === b.length){
        for(let i = 0; i < a.length; i++){
          if(a.id !== b.id) 
            return false;
        }
      }else {
        return false;
      }      
      return true;
    })

    //console.log('render: ? ',!areShiftsTheSame)
    if(areShiftsTheSame){
      return false;
    }else {
      return true;
    }
    
  }

  render() {
    const { shifts, selected } = this.props;
    //console.log('shift analyze render',shifts,selected);
    if (!shifts) return <Progress variant="circular" fullWidth fullHeight />;
    
    return (   
      <div style={{ height: 'calc(100% - 64px)' }}>        
        <AnalyzeToolbar 
          selectLabel={this.selectLabel}
          label="Shifts"
          add={this.add}
          selected={selected}
        />
        <VirtualizedSortSelect
          data={shifts || []}
          columns={rows} 
          selected={selected}
          select={this.select}
          initialSortBy="clockInDate"     
        />
      </div>  
            
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
  return {
    shifts: shiftSelectors.getShiftsInRange(state, { startTime: moment().subtract(400, 'days').format('MM-DD-YY HH:mm:ss'), endTime: moment().add(14,'days').format('MM-DD-YY HH:mm:ss') }),
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
    id: 'firstName', 
    dataKey: 'employee',
    width: 150, 
    height: 56,
    padding: 'dense',
    label: 'First Name',
    type: TableDataTypes.OBJECT,
    keys: ['firstName']
  },
  {
    id: 'lastName', 
    dataKey: 'employee',   
    width: 150,   
    height: 56,
    padding: 'dense',
    label: 'Last Name',
    type: TableDataTypes.OBJECT,
    keys: ['lastName']
  },
  {
    id: 'clockInDate',  
    dataKey: 'clockInDate',  
    width: 200,   
    height: 56,
    padding: 'dense',
    label: 'Clock In',
    type: TableDataTypes.DATETIME
  },
  {
    id: 'clockOutDate', 
    dataKey: 'clockOutDate', 
    width: 200,  
    height: 56,  
    padding: 'dense',
    label: 'Clock Out',
    type: TableDataTypes.DATETIME
  },
  {
    id: 'length',    
    dataKey: 'length',  
    width: 120, 
    height: 56,
    padding: 'dense',
    label: 'Length',
    type: TableDataTypes.LENGTH
  }
];