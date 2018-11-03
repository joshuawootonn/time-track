import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { Formik } from 'formik';

import { shiftSelectors,projectSelectors, projectTaskSelectors } from 'store/selectors';
import * as analyzeConstants from 'constants/analyze';
import Hero from 'components/layouts/Hero';
import GenericTable from 'components/tables/Generic';
import * as TableDataTypes from 'constants/tableDataTypes';
import ShiftEditContainer from 'components/forms/ShiftEdit';

class ShiftDetailsContainer extends Component {
  render () {
    const { selected,status,projects,projectTasks } = this.props;
    //console.log(selected,status)
    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Shift.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeConstants.EDITING){
      return (
        <GenericTable
          label="Activities"
          tableData={selected.activities}
          headerData={rows}
          edit={()=> {console.log('edit');}}
          remove={()=> {console.log('remove');}}
        />
      );
    }
    if(status === analyzeConstants.ADDING){
      return (
        <Formik
          initialValues={{
            lunch: 0,
            activities: [
              {
                projectId: -1,
                projectTaskId: -1,
                length: 0,
                description: ''
              }
            ]
          }}
          render={formikProps => {
            return (
              <ShiftEditContainer
                label="Add Shift"
                type="add"
                projects={projects}
                projectTasks={projectTasks}
                {...formikProps}
              />
            );
          }}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    selected: shiftSelectors.getSelectedShift(state),    
    status: state.analyze.shiftStatus,
    projects: projectSelectors.getAllProjects(state),
    projectTasks: projectTaskSelectors.getAllProjectTasks(state)
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
    keys: ['project','name']
  },
  {
    id: 'projectTask',
    numeric: false,
    padding: 'dense',
    label: 'Task',
    type: TableDataTypes.OBJECT,
    keys: ['task','name']
  },
  {
    id: 'length',
    numeric: false,
    padding: 'dense',
    label: 'Length',
    type: TableDataTypes.LENGTH
  }  
];