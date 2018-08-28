import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  Input,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import { Form, Field, FieldArray } from 'formik';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import styles from './styles';
import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import { minutes, hours } from 'constants/times';

const ClockOutForm = props => {
  const {
    classes,
    isSubmitting,
    handleSubmit,
    shift,
    values,
    projects,
  } = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.lineBox}>
                <Typography variant="title">Date:</Typography>
                <Typography variant="title">{shift.date}</Typography>
              </div>
              <div className={classes.lineBox}>
                <Typography variant="title">Time:</Typography>
                <Typography variant="title">
                  {shift.in} - {shift.out}
                </Typography>
              </div>
              <div className={classes.lineBox}>
                <Typography variant="title">Time Worked:</Typography>
                <Typography variant="title">{shift.length}</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FieldArray
                name="activities"
                render={arrayHelpers => (
                  <div>
                    {values.activities &&
                      values.activities.map((activity, index) => {
                        return (
                          <div key={index} className={classes.horizontalBox}>
                            <Field
                              name={`activities.${index}.projectId`}
                              render={({ field }) => (
                                <Select
                                  label="Project"
                                  formControlProps={{ fullWidth: true }}
                                  selectProps={{
                                    autoWidth: true,
                                    ...field,
                                    input: (
                                      <Input
                                        name={`activities.${index}.projectId`}
                                      />
                                    ),
                                  }}
                                >
                                  {Object.keys(projects).map((key, i) => {
                                    // This protects against projects that don't have accociated tasks
                                    if (!projects[key].tasks) return null;
                                    return (
                                      <MenuItem
                                        key={i}
                                        id="projectId"
                                        value={projects[key].id}
                                      >
                                        {projects[key].name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              )}
                            />
                            <Field
                              name={`activities.${index}.projectTaskId`}
                              render={({ field }) => (
                                <Select
                                  label="Task"
                                  formControlProps={{ fullWidth: true }}
                                  selectProps={{
                                    autoWidth: true,
                                    ...field,
                                    input: (
                                      <Input
                                        name={`activities.${index}.projectTaskId`}
                                      />
                                    ),
                                  }}
                                >
                                  {projects[activity.projectId].tasks.map(
                                    (task, i) => {
                                      return (
                                        <MenuItem
                                          key={i}
                                          id="projectTaskId"
                                          value={task.projectTaskId}
                                        >
                                          {task.name}
                                        </MenuItem>
                                      );
                                    },
                                  )}
                                </Select>
                              )}
                            />

                            <Field
                              name={`activities.${index}.length`}
                              render={({ field }) => (
                                <Select
                                  label="Length"
                                  formControlProps={{ fullWidth: true }}
                                  selectProps={{
                                    autoWidth: true,
                                    ...field,
                                    input: (
                                      <Input
                                        name={`activities.${index}.length`}
                                      />
                                    ),
                                  }}
                                >
                                  {hours.map((time, i) => {
                                    return (
                                      <MenuItem
                                        key={i}
                                        id="length"
                                        value={time.asMinutes()}
                                      >
                                        {time.format('h:mm', { trim: false })}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              )}
                            />
                            <Field
                              name={`activities.${index}.length`}
                              render={({ field }) => (
                                <Select
                                  label="Length"
                                  formControlProps={{ fullWidth: true }}
                                  selectProps={{
                                    autoWidth: true,
                                    ...field,
                                    input: (
                                      <Input
                                        name={`activities.${index}.length`}
                                      />
                                    ),
                                  }}
                                >
                                  {minutes.map((time, i) => {
                                    return (
                                      <MenuItem
                                        key={i}
                                        id="length"
                                        value={time.asMinutes()}
                                      >
                                        {time.format('h:mm', { trim: false })}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              )}
                            />

                            <Field
                              value={activity.description}
                              name={`activities.${index}.description`}
                              render={fieldProps => (
                                <TextField
                                  label="Description"
                                  {...fieldProps}
                                />
                              )}
                            />

                            <div className={classes.verticalCenterBox}>
                              <IconButton
                                type="button"
                                className={classes.iconButton}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Close />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        arrayHelpers.push({
                          projectId: 1,
                          projectTaskId: 0,
                          length: 500,
                          description: '',
                        })
                      }
                    >
                      Add Activity
                    </Button>
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonBox}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.button}
                >
                  Enter
                </Button>

                <Button
                  type="submit"
                  // onClick={cancel}
                  color="secondary"
                  variant="text"
                  className={classes.button}
                >
                  Cancel
                </Button>
              </div>
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
};

export default withStyles(styles)(ClockOutForm);
