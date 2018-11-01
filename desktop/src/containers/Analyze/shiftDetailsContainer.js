import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';

import ClockOutContainer from 'containers/Clock/clockOutContainer';
import { shiftSelectors } from 'store/selectors';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import GenericTable from 'components/tables/Generic';
import * as TableDataTypes from 'constants/tableDataTypes';

class ShiftDetailsContainer extends Component {
  render () {
    const { selected,status } = this.props;
    //console.log(selected,status)
    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select an Project.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeConstants.EDITING){
      return (
        <GenericTable
          label="Activities"
          tableData={selected.activities}
          headerData={rows}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    selected: shiftSelectors.getSelectedShift(state),    
    status: state.analyze.shiftStatus    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // createProject: project => {
    //   return dispatch(projectActions.postProject(project));
    // },
    // updateProject: project => {
    //   return dispatch(projectActions.putProject(project));
    // },
    // deleteProject: project => {
    //   return dispatch(projectActions.deleteProject(project));
    // },
    // selectProject: project => {
    //   return dispatch(analyzeActions.selectProject(project));
    // },
    // setProjectStatus: status => {
    //   return dispatch(analyzeActions.setProjectStatus(status));
    // }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ShiftDetailsContainer);


const rows = [
  {
    id: 'projectTask',
    numeric: false,
    padding: 'dense',
    label: 'Project',
    type: TableDataTypes.OBJECT,
    key: 'projectId'
  },
  {
    id: 'projectTask',
    numeric: false,
    padding: 'dense',
    label: 'Task',
    type: TableDataTypes.OBJECT,
    key: 'taskId'
  },
  {
    id: 'length',
    numeric: false,
    padding: 'dense',
    label: 'Length',
    type: TableDataTypes.LENGTH
  }  
];