import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Paper
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import cx from 'classnames';
import { Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import TextField from 'components/inputs/TextField';
import Time from 'components/inputs/Time';
import TypeableSelect from 'components/inputs/TypeableSelect';

import styles from './styles';

import { minutesToString } from 'helpers/time';

export class FullShift extends Component {
  render() {
    const {
      classes,
      isSubmitting,
      resetForm,
      initialValues,
      errors,
      values,
      projects,
      projectTasks,
      employees,
      timeLeft,
      generalError
    } = this.props;
    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="employeeId"
              component={TypeableSelect}
              items={employees}
              type="employee"
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
              label="End Date"
              type="datetime-local"
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
                        <div key={index} className={classes.gridContainer}>
                          <Grid item xs={12} className={cx(classes.card)}>
                            <div className={cx(classes.row, classes.headerRow)}>
                              <Typography varient="h2">
                                Activity {index + 1}
                              </Typography>
                              <div className={classes.verticalCenter}>
                                <Tooltip title="Remove Activitiy">
                                  <IconButton
                                    type="button"
                                    id={`${ANALYZE_SHIFT_FULL_SHIFT_REMOVE_ACTIVITY_BUTTON_ID}_${index}`}
                                    color="secondary"
                                    className={classes.iconButton}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Close />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                          </Grid>
                          <Grid item xs={12} className={cx(classes.card)}>
                            <div className={cx(classes.row, classes.bodyRow)}>
                              <Field
                                name={`activities.${index}.projectId`}
                                component={TypeableSelect}
                                items={projects}
                                type="name"
                                fullWidth
                                label="Project"
                                id={`${ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID}_${index}`}
                                className={classes.field}
                                onChange={() => {
                                  arrayHelpers.form.setFieldValue(
                                    `activities.${index}.projectTaskId`,
                                    -1
                                  );
                                }}
                              />
                              <Field
                                name={`activities.${index}.projectTaskId`}
                                component={TypeableSelect}
                                fullWidth
                                label="Task"
                                className={classes.field}
                                type="task"
                                items={projectTasks // This code iterates the projectTask
                                  .filter(projectTask => {
                                    return (
                                      activity.projectId ===
                                      projectTask.projectId
                                    ); // filters based on project selected
                                  })}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} className={cx(classes.card)}>
                            <div className={cx(classes.row, classes.bodyRow)}>
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
                            </div>
                          </Grid>
                        </div>
                      );
                    })}
                  <Grid
                    item
                    xs={12}
                    className={cx(classes.row, classes.footerRow)}
                  >
                    <div className={classes.lunchBox}>
                      <Field
                        name="lunch"
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
                      id={ANALYZE_SHIFT_FULL_SHIFT_ADD_ACTIVITY_BUTTON_ID}
                      onClick={() =>
                        arrayHelpers.push({
                          projectId: Object.keys(projects)[0],
                          projectTaskId: -1,
                          length: 0,
                          description: ``
                        })
                      }
                    >
                      Add Activity
                    </Button>
                  </Grid>
                </Grid>
              );
            }}
          />

          <Grid item xs={12} className={cx(classes.row, classes.footerRow)}>
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
                disabled={
                  isSubmitting ||
                  Object.keys(errors).length !== 0 ||
                  timeLeft !== 0
                }
                variant="contained"
                id={ANALYZE_SHIFT_FULL_SHIFT_SUBMIT_BUTTON_ID}
                className={classes.button}
              >
                Save Shift
              </Button>

              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                color="secondary"
                variant="text"
                id={ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID}
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

export const ANALYZE_SHIFT_FULL_SHIFT_RESET_BUTTON_ID = `analyze_shift_full_shift_reset_button`;
export const ANALYZE_SHIFT_FULL_SHIFT_SUBMIT_BUTTON_ID = `analyze_shift_full_shift_submit_button`;
export const ANALYZE_SHIFT_FULL_SHIFT_ADD_ACTIVITY_BUTTON_ID = `analyze_shift_full_shift_add_activity_button`;
export const ANALYZE_SHIFT_FULL_SHIFT_REMOVE_ACTIVITY_BUTTON_ID = `analyze_shift_full_shift_remove_activity_button`;
export const ANALYZE_SHIFT_FULL_SHIFT_PROJECT_FIELD_ID = `analyze_shift_full_shift_project_field`;

FullShift.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
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

export default withStyles(styles)(FullShift);
