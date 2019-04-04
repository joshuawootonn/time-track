import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';

import FullShiftForm from 'components/forms/Shift/FullShift';
import HalfShiftForm from 'components/forms/Shift/HalfShift';
import FormHeader from 'components/forms/Shift/FormHeader'

import { shiftSelectors,projectSelectors, projectTaskSelectors,employeeSelectors } from 'store/selectors';
import { analyzeStatus } from 'constants/analyze';
import { shiftActions } from 'store/actions';
import Hero from 'components/layouts/Hero';
import { shift as shiftValidation } from 'constants/formValidation';
import { minutesRoudedTime } from 'helpers/time';

export const HALF_SHIFT = 'half_shift';
export const FULL_SHIFT = 'full_shift';


export class ShiftCRUD extends Component {
  state = {
    crudExtent: HALF_SHIFT
  }
  removeShift = () => {
    const { selected, removeShift } = this.props;  
    removeShift(selected.id);
  };
  render () {
    const { selected,status,projects,projectTasks,employees } = this.props;
    
    if(status === analyzeStatus.INIT){
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Shift.. </Typography>
        </Hero>
      );
    }
    console.log('selected shift', selected);

    if(status === analyzeStatus.EDITING){
      return (
        <div>
          <FormHeader 
            label='Edit Shift'
            remove={this.removeShift}
            type={status}
            />
          {this.state.crudExtent === HALF_SHIFT  && <Formik
            enableReinitialize
            initialValues={{
              ...selected,
              clockInDate: moment.utc(selected.clockInDate).local().format('YYYY-MM-DDTHH:mm'),
              clockOutDate: selected.clockOutDate ? moment.utc(selected.clockOutDate,'YYYY-MM-DDThh:mm:ss:SSS').local().format('YYYY-MM-DDTHH:mm') : moment.utc().local().format('YYYY-MM-DDTHH:mm'),
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
              const { updateShift } = this.props;           

              return updateShift(values).then(
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
              const shiftDuration = moment.duration(moment(values.clockOutDate,'YYYY-MM-DDTHH:mm').diff(moment(values.clockInDate,'YYYY-MM-DDTHH:mm')));
              let timeLeft = minutesRoudedTime(Math.floor(shiftDuration.asMinutes())) - values.lunch;
              values.activities.forEach(activity => {
                timeLeft -= activity.length;
              }); 
              //console.log(shiftDuration,shiftDuration.asMinutes(),Math.floor(shiftDuration.asMinutes()),minutesRoudedTime(Math.floor(shiftDuration.asMinutes())),timeLeft);           
              let generalError;
              if (errors.activities && typeof errors.activities === 'string'){
                generalError = errors.activities;
              }else if (errors.lunch && typeof errors.lunch === 'string'){
                generalError = errors.lunch;
              }
              return (
                <HalfShiftForm
                  label="Edit Shift"
                  type="edit"
                  employees={employees}
                  projects={projects}
                  projectTasks={projectTasks}
                  timeLeft={timeLeft}      
                  generalError={generalError} 
                  removeShift={this.removeShift}         
                  {...formikProps}
                />
              );
            }}
          />
          }

          {this.state.crudExtent === FULL_SHIFT  && <Formik
            enableReinitialize
            initialValues={{
              ...selected,
              clockInDate: moment.utc(selected.clockInDate).local().format('YYYY-MM-DDTHH:mm'),
              clockOutDate: selected.clockOutDate ? moment.utc(selected.clockOutDate,'YYYY-MM-DDThh:mm:ss:SSS').local().format('YYYY-MM-DDTHH:mm') : moment.utc().local().format('YYYY-MM-DDTHH:mm'),
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
              const { updateShift } = this.props;           

              return updateShift(values).then(
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
              const shiftDuration = moment.duration(moment(values.clockOutDate,'YYYY-MM-DDTHH:mm').diff(moment(values.clockInDate,'YYYY-MM-DDTHH:mm')));
              let timeLeft = minutesRoudedTime(Math.floor(shiftDuration.asMinutes())) - values.lunch;
              values.activities.forEach(activity => {
                timeLeft -= activity.length;
              }); 
              //console.log(shiftDuration,shiftDuration.asMinutes(),Math.floor(shiftDuration.asMinutes()),minutesRoudedTime(Math.floor(shiftDuration.asMinutes())),timeLeft);           
              let generalError;
              if (errors.activities && typeof errors.activities === 'string'){
                generalError = errors.activities;
              }else if (errors.lunch && typeof errors.lunch === 'string'){
                generalError = errors.lunch;
              }
              return (
                <HalfShiftForm
                  label="Edit Shift"
                  type="edit"
                  employees={employees}
                  projects={projects}
                  projectTasks={projectTasks}
                  timeLeft={timeLeft}      
                  generalError={generalError} 
                  removeShift={this.removeShift}         
                  {...formikProps}
                />
              );
            }}
          />
          }
        </div>
        
      );
    }

    if(status === analyzeStatus.ADDING){
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
            const { createShift } = this.props;
            return createShift(values).then(
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
              <FullShiftForm
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

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    selected: shiftSelectors.getSelectedShift(state),    
    status: state.analyze.shiftStatus,
    projects: projectSelectors.getAllProjects(state),
    projectTasks: projectTaskSelectors.getAllProjectTasks(state),
    employees: employeeSelectors.getAllEmployeesWithContents(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    createShift: shift => {
      return dispatch(shiftActions.createShift( shift));
    },
    updateShift: shift => {
      return dispatch(shiftActions.updateShift(shift));
    },
    removeShift: shift => {
      return dispatch(shiftActions.removeShift(shift));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ShiftCRUD);


