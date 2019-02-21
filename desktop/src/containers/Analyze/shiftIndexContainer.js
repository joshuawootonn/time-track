import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import { employeeActions, taskActions, projectActions, shiftActions, analyzeActions } from 'store/actions';
import { shiftSelectors } from 'store/selectors';
import VirtualizedSortSelect from 'components/tables/VirtualizedSortSelect';
import AnalyzeToolbar from 'components/toolbars/AnalyzeToolbar';
import Progress from 'components/helpers/Progress';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class ShiftIndex extends Component {
  componentDidMount = () => {
    // Fetching here to ensure that all employees have been fetched before we try and display their name for their shift
    this.props.getAllEmployees();
    this.props.getAllProjects();
    this.props.getAllTasks();
    this.props.getShiftsInRange(moment().subtract(400, 'days').format('MM-DD-YY HH:mm:ss'), moment().add(14,'days').format('MM-DD-YY HH:mm:ss'));
  }

  selectLabel = selected =>`${selected.employee.firstName} ${selected.employee.lastName}'s shift selected`;

  select = object => this.props.select(domain.SHIFT,object)

  add = () => this.props.setStatus(domain.SHIFT,analyzeStatus.ADDING)

  render() {
    const { shifts, selected } = this.props;
    
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
        />
      </div>  
            
    );
  }
}

ShiftIndex.propTypes = {
  shifts: PropTypes.array,
  getShiftsInRange: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  getAllProjects: PropTypes.func.isRequired,
  getAllTasks: PropTypes.func.isRequired,
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
    getAllEmployees: () => {
      return dispatch(employeeActions.getAllEmployees());
    },
    getAllProjects: () => {
      return dispatch(projectActions.getAllProjects());
    },
    getAllTasks: () => {
      return dispatch(taskActions.getAllTasks());
    },
    getShiftsInRange: (start, end) => {
      return dispatch(shiftActions.getShiftsInRange(start, end));
    },    
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