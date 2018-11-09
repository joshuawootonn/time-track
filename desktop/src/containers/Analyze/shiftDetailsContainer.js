import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';

import { shiftSelectors,projectSelectors, projectTaskSelectors,employeeSelectors } from 'store/selectors';
import * as analyzeConstants from 'constants/analyze';
import { shiftActions } from 'store/actions';
import Hero from 'components/layouts/Hero';
import * as TableDataTypes from 'constants/tableDataTypes';
import ShiftEditContainer from 'components/forms/ShiftEdit';
import { shift as shiftValidation } from 'constants/formValidation';
import { minutesRoudedTime } from 'helpers/time';
import shiftActionTypes from 'constants/ActionTypes/shift';

class ShiftDetailsContainer extends Component {
  deleteShift = () => {
    const { selected, deleteShift } = this.props;  
    deleteShift(selected);
  };
  render () {
    console.log(shiftActionTypes);
    const { selected,status,projects,projectTasks,employees } = this.props;
    //console.log('asdfasdfasdfas',selected,status);
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
              console.log(activity);
              return {
                ...activity,
                projectId: activity.projectTask.projectId
              };
            })            
          }}
          validationSchema={shiftValidation}
          onSubmit={(values,formikFunctions) => {
            const { editShift } = this.props;
            editShift(values,values.activities).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
              },
              e => {
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
                deleteShift={this.deleteShift}         
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
            lunch: 30,
            clockInDate : moment().startOf('day').add('minutes',450).format('YYYY-MM-DDTHH:mm'),            
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
          }}
          validationSchema={shiftValidation}
          onSubmit={(values,formikFunctions) => {
            const { addShift } = this.props;
            console.log(addShift,'asdf');
            addShift(values,values.activities).then(
              () => {
                formikFunctions.resetForm();
                formikFunctions.setStatus({ success: true });
              },
              e => {
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
    },
    editShift: (shift,activities) => {
      return dispatch(shiftActions.editShift(shift,activities));
    },
    deleteShift: shift => {
      return dispatch(shiftActions.deleteShift(shift));
    }
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