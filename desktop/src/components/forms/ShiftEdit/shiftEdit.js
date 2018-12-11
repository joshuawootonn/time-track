import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button, Tooltip, IconButton, MenuItem } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import cx from 'classnames';
import { Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import Time from 'components/inputs/Time';

import styles from './styles';

import { minutesToString } from 'helpers/time';

export class ShiftEdit extends Component {
  render() {
    const { classes, label, type, removeShift, isSubmitting, resetForm, initialValues, errors,  values,
      projects, projectTasks, employees,  timeLeft, generalError } = this.props;
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {type === 'edit' && (
              <Tooltip title="Delete">
                <IconButton onClick={removeShift} aria-label="Delete">
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


          <FieldArray
            name="activities"
            render={arrayHelpers => {
              return (
                <Grid item xs={12} container className={classes.body}>
                  {values.activities &&
                    values.activities.map((activity, index) => {
                      return (
                        <Grid item xs={12}
                          key={index}
                          className={cx(
                            classes.card,
                            classes.verticalCenterBox,
                          )}
                        >
                          <div className={cx(classes.row,classes.bodyRow)}>
                            <Field
                              name={`activities.${index}.projectId`}
                              component={Select}
                              items={projects}
                              fullWidth
                              label="Project"     
                              id={`project-field-${index}`}                                                      
                              className={classes.field}
                              onChange={ () => {                                  
                                arrayHelpers.form.setFieldValue(
                                  `activities.${index}.projectTaskId`,
                                  -1,
                                );                                  
                              }}
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
                                id={`remove-activity-${index}`}
                                color="secondary"
                                className={classes.iconButton}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Close />
                              </IconButton>
                            </div>
                          </div>
                        </Grid>
                      );
                    })                 
                  }
                  <Grid item xs={12} className={cx(classes.row,classes.footerRow)}>
                    <div className={classes.lunchBox}>
                      <Field
                        name='lunch'
                        label1="Lunch"
                        label2=" "
                        fullWidth
                        margin="none"
                        component={Time}
                        className={classes.field}
                      />
                    </div>
                    <Button
                      color="primary"
                      variant="contained"
                      id={'add-activity'}
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
                </Grid>
              );
            }
            }
          />

          <Grid item xs={12} className={cx(classes.row,classes.footerRow)}>
            <Typography variant="h5" margin="none">
              Time Left: {minutesToString(timeLeft)}
            </Typography>
            <Typography
              color="error"
              variant="button"
              className={classes.field}
            >
              {generalError}
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
                onClick={() => {
                  resetForm(initialValues);
                }}
                id={'shift-edit-reset-button'}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
            </div>
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
  removeShift: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired, 
  projectTasks: PropTypes.array.isRequired, 
  employees: PropTypes.array.isRequired,
  timeLeft: PropTypes.number.isRequired,
  generalError: PropTypes.string,
  values: PropTypes.object.isRequired
};

export default withStyles(styles)(ShiftEdit);