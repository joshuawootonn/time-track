import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';

import { shiftSelectors,projectSelectors, projectTaskSelectors,employeeSelectors } from 'store/selectors';
import * as analyzeConstants from 'constants/analyze';
import { shiftActions } from 'store/actions';
import Hero from 'components/layouts/Hero';
import GenericTable from 'components/tables/Generic';
import * as TableDataTypes from 'constants/tableDataTypes';
import ShiftEditContainer from 'components/forms/ShiftEdit';
import { shift as shiftValidation } from 'constants/formValidation';
import { minutesRoudedTime } from 'helpers/time';

class ShiftDetailsContainer extends Component {
  render () {
    const { selected,status,projects,projectTasks,employees } = this.props;
    //console.log(selected,status);
    if(status === analyzeConstants.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Shift.. </Typography>
        </Hero>
      );
    }
    if(status === analyzeConstants.EDITING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected,
            clockInDate: moment(selected.clockInDate).format('YYYY-MM-DDTHH:mm'),
            clockOutDate: moment(selected.clockOutDate).format('YYYY-MM-DDTHH:mm'),
            lunch: selected.lunch,
            activities: selected.activities.map(activity => {
              return {
                ...activity,
                projectId: activity.projectTask.projectId
              };
            })            
          }}
          validationSchema={shiftValidation}
          onSubmit={(values,formikFunctions) => {
            const { addShift } = this.props;
            addShift(values,values.activities).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow');
              },
              e => {
                console.log('asdf', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            const { values,errors } = formikProps;
            const shiftDuration = moment.duration(moment(values.clockOutDate).diff(moment(values.clockInDate)));
            let timeLeft = minutesRoudedTime(Math.floor(shiftDuration.asMinutes())) - values.lunch;
            values.activities.forEach(activity => {
              timeLeft -= activity.length;
            });            

            let generalError;
            if (errors.activities && typeof errors.activities === 'string'){
              generalError = errors.activities;
            }else if (errors.lunch && typeof errors.lunch === 'string'){
              generalError = errors.lunch;
            }
            return (
              <ShiftEditContainer
                label="Edit Shift"
                type="edit"
                employees={employees}
                projects={projects}
                projectTasks={projectTasks}
                timeLeft={timeLeft}      
                generalError={generalError}          
                {...formikProps}
              />
            );
          }}
        />
      );
    }
    if(status === analyzeConstants.ADDING){
      return (
        <Formik
          enableReinitialize
          initialValues={{
            lunch: 0,
            clockInDate : moment().startOf('day').add('minutes',390).format('YYYY-MM-DDTHH:mm'),            
            clockOutDate : moment().format('YYYY-MM-DDTHH:mm'),
            employeeId: -1,
            activities: [
              {
                projectId: -1,
                projectTaskId: -1,
                length: 0,
                description: ''
              }
            ] 
            /*lunch: 30,
            clockInDate : moment().startOf('day').add('minutes',390).format('YYYY-MM-DDThh:mm'),            
            clockOutDate : moment().format('YYYY-MM-DDTHH:mm'),
            employeeId: 1,
            activities: [
              {
                projectId: 1,
                projectTaskId: 2,
                length: 120,
                description: ''
              },{
                projectId: 1,
                projectTaskId: 1,
                length: 180,
                description: ''
              }
            ]*/
          }}
          validationSchema={shiftValidation}
          onSubmit={(values,formikFunctions) => {
            const { addShift } = this.props;
            addShift(values,values.activities).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
                console.log('wow');
              },
              e => {
                console.log('asdf', e);
                formikFunctions.setStatus({ success: false });
                formikFunctions.setSubmitting(false);
                formikFunctions.setErrors({ submit: e });
              }
            );
          }}
          render={formikProps => {
            const { values,errors } =formikProps;
            const shiftDuration = moment.duration(moment(values.clockOutDate).diff(moment(values.clockInDate)));
            let timeLeft = minutesRoudedTime(Math.floor(shiftDuration.asMinutes())) - values.lunch;
            values.activities.forEach(activity => {
              timeLeft -= activity.length;
            });
            

            let generalError;
            if (errors.activities && typeof errors.activities === 'string'){
              generalError = errors.activities;
            }else if (errors.lunch && typeof errors.lunch === 'string'){
              generalError = errors.lunch;
            }
            return (
              <ShiftEditContainer
                label="Add Shift"
                type="add"
                employees={employees}
                projects={projects}
                projectTasks={projectTasks}
                timeLeft={timeLeft}      
                generalError={generalError}          
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
    projectTasks: projectTaskSelectors.getAllProjectTasks(state),
    employees: employeeSelectors.getAllEmployeesWithContents(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShift: (shift,activities) => {
      return dispatch(shiftActions.addShift( shift, activities));
    }
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