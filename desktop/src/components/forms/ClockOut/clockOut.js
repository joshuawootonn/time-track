import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, IconButton, MenuItem, SvgIcon } from '@material-ui/core';
import { AccessTime as TimeIcon, Timer as DurationIcon, Today as DateIcon } from '@material-ui/icons';
import { Field, FieldArray } from 'formik';
import { Close } from '@material-ui/icons';
import styles from './styles';
import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import Time from 'components/inputs/Time';

const ClockOutForm = props => {
  const { classes, isSubmitting, handleSubmit, shift, values, projects, projectTasks, cancel, errors } = props;
  let errorGeneralMessage;
  if (errors.activities && typeof errors.activities === 'string'){
    errorGeneralMessage = errors.activities;
  }else if (errors.lunch && typeof errors.lunch === 'string'){
    errorGeneralMessage = errors.lunch;
  }
  
  console.log(values.activities,errors.activities);
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.formHeader}>
              <Typography variant="display2">Clock Out</Typography>

              <div className={classes.formHeader}>
                <SvgIcon className={classes.formHeaderIcon} color="action">
                  <DateIcon />
                </SvgIcon>
                <Typography variant="headline">{shift.date}</Typography>
              </div>

              <div className={classes.formHeader}>
                <SvgIcon className={classes.formHeaderIcon} color="action">
                  <TimeIcon />
                </SvgIcon>
                <Typography variant="headline">
                  {shift.in} - {shift.out}
                </Typography>
              </div>

              <div className={classes.formHeader}>
                <SvgIcon className={classes.formHeaderIcon} color="action">
                  <DurationIcon />
                </SvgIcon>
                <Typography variant="headline">
                  Length: {shift.length}
                </Typography>
              </div>
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
                                />
                                <Field
                                  name={`activities.${index}.projectTaskId`}
                                  component={Select}
                                  fullWidth
                                  label="Task"
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
                                />
                                <Field
                                  name={`activities.${index}.description`}
                                  label="Description"
                                  component={TextField}
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
                            name={`lunch`}
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

                        <Typography variant="body1" margin="none" className={classes.error}>
                          {errorGeneralMessage}
                        </Typography>

                        <div>
                          <Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting || Object.keys(errors).length !== 0}
                            variant="contained"
                            className={classes.button}
                          >
                            Clock Out
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
        </form>
      </div>
    </div>
  );
};

ClockOutForm.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  shift: PropTypes.object,
  projects: PropTypes.array,
  projectTasks: PropTypes.array,
  cancel: PropTypes.func
};

export default withStyles(styles)(ClockOutForm);
