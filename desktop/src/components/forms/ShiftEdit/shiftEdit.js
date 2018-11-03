import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  Grid,  Typography,  Button,  Tooltip,  IconButton, MenuItem } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import cx from 'classnames';
import { Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import moment from 'moment';

import TextField from 'components/inputs/TextField';
import Switch from 'components/inputs/Switch';
import Select from 'components/inputs/Select';
import Time from 'components/inputs/Time';

import styles from './styles';

import { minutesToString } from 'helpers/time';

class ShiftEdit extends Component {
  render () {
    const { classes,label,type,deleteShift,isSubmitting,resetForm,initialValues,errors, handleSubmit, shift, values, 
      projects, projectTasks,employees, cancel,timeLeft,generalError  } = this.props;

    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow,classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {type === 'edit' && (
              <Tooltip title="Delete">
                <IconButton onClick={deleteShift} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name='employeeId'
              component={Select}
              items={employees}
              fullWidth                    
              className={classes.field}        
              label="Employee"
            /> 
            <Field
              name="clockInDate"
              component={TextField}              
              margin="none"
              label="Start Date"
              type="datetime-local"              
              className={classes.field}
              helper="normal"
            />   
            <Field
              name="clockOutDate"
              component={TextField}              
              margin="none"
              label="Start Date"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"      
              className={classes.field}
              helper="normal"
            />         
          </Grid>

          <Grid item xs={12}>
            <FieldArray
              name="activities"
              render={arrayHelpers => {
                return (
                  <div>
                    {values.activities &&
                        values.activities.map((activity, index) => {
                          return (
                            <div
                              key={index}
                              className={cx(
                                classes.card,
                                classes.verticalCenterBox,
                              )}
                            >
                              <div className={classes.formBody}>
                                <Field
                                  name={`activities.${index}.projectId`}
                                  component={Select}
                                  items={projects}
                                  fullWidth
                                  label="Project"
                                  className={classes.field} 
                                />
                                <Field
                                  name={`activities.${index}.projectTaskId`}
                                  component={Select}
                                  fullWidth
                                  label="Task"
                                  className={classes.field} 
                                >
                                  {
                                    projectTasks // This code iterates the projectTask 
                                      .filter(projectTask => {
                                        return activity.projectId === projectTask.projectId; // filters based on project selected
                                      })
                                      .map((projectTask, i) => { // maps those elements
                                        return (
                                          <MenuItem
                                            key={i}
                                            id="projectTaskId"
                                            value={projectTask.id}
                                          >
                                            {projectTask.task.name}
                                          </MenuItem>
                                        );
                                      })
                                  }
                                </Field>
                                <Field
                                  name={`activities.${index}.length`}
                                  component={Time}
                                  fullWidth
                                  className={classes.field} 
                                />
                                <Field
                                  name={`activities.${index}.description`}
                                  label="Description"
                                  component={TextField}
                                  className={classes.field} 
                                />
                                <div className={classes.verticalCenter}>
                                  <IconButton
                                    type="button"
                                    color="secondary"
                                    className={classes.iconButton}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Close />
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                    <Grid item xs={12} className={classes.formFooter}>
                      <div className={classes.lunchBox}>
                        <Field
                          name={'lunch'}
                          label1="Lunch"
                          label2=" "
                          fullWidth
                          margin="none"
                          component={Time}
                        />
                      </div>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          arrayHelpers.push({
                            projectId: Object.keys(projects)[0],
                            projectTaskId: -1,
                            length: 0,
                            description: ''
                          })
                        }
                      >
                          Add Activity
                      </Button>
                    </Grid>

                    <Grid item xs={12} className={classes.formFooter}>
                      <Typography variant="h5" margin="none">
                          Time Left: {minutesToString(timeLeft)}
                      </Typography>
                      <Typography
                        color="error"
                        variant="button"
                        className={classes.field}
                      >
                        {errors.submit}
                      </Typography>                 

                      <div>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={isSubmitting || Object.keys(errors).length !== 0 || timeLeft !== 0}
                          variant="contained"
                          className={classes.button}
                        >
                          Save
                        </Button>

                        <Button
                          onClick={cancel}
                          color="secondary"
                          variant="text"
                          className={classes.button}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Grid>
                  </div>
                );
              }}
            />
          </Grid> 
        </Grid>
      </Form>
    );
  }
}
ShiftEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  deleteShift: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(ShiftEdit);