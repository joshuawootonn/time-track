import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  Input,
  SvgIcon
} from '@material-ui/core';
import { AccessTime as TimeIcon, Timer as DurationIcon, Today as DateIcon } from "@material-ui/icons";
import { Field, FieldArray } from 'formik';
import { Close } from '@material-ui/icons';
import styles from './styles';
import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import Time from 'components/inputs/Time';

const ClockOutForm = props => {
  const {
    classes,
    isSubmitting,
    handleSubmit,
    shift,
    values,
    projects,
    cancel
  } = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.formHeader}>

              <Typography variant="display2">Clock Out</Typography>

              <div className={classes.formHeader}>
                <SvgIcon className={classes.formHeaderIcon} color="action"><DateIcon /></SvgIcon>
                <Typography variant="headline">{shift.date}</Typography>
              </div>

              <div className={classes.formHeader}>
                <SvgIcon className={classes.formHeaderIcon} color="action"><TimeIcon /></SvgIcon>
                <Typography variant="headline">{shift.in} - {shift.out}</Typography>
              </div>

              <div className={classes.formHeader}>
                <SvgIcon className={classes.formHeaderIcon} color="action"><DurationIcon /></SvgIcon>
                <Typography variant="headline">Length:  {shift.length}</Typography>
              </div>

            </Grid>

            <Grid item xs={12}>
              <FieldArray
                name="activities"
                render={arrayHelpers => {
                  console.log(values.activities)
                  return (<div>
                    {values.activities &&
                      values.activities.map((activity, index) => {
                        return (
                          <div key={index} className={cx(classes.card, classes.verticalCenterBox)}>

                            <div className={classes.formBody}>
                              <Field

                                name={`activities.${index}.projectId`}
                                render={({ field }) => (
                                  <Select
                                    label="Project"
                                    className={classes.formElement}
                                    formControlProps={{
                                      className: classes.formElement,
                                      fullWidth: true
                                    }}
                                    labelProps={{
                                      className: classes.formElement
                                    }}
                                    selectProps={{
                                      autoWidth: true,
                                      ...field,
                                      className: classes.formElement,
                                      input: (
                                        <Input
                                          name={`activities.${index}.projectId`}
                                        />
                                      ),
                                    }}
                                  >
                                    {Object.keys(projects).map((key, i) => {
                                      // This protects against projects that don't have accociated tasks

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
                                    formControlProps={{
                                      className: classes.formElement,
                                      fullWidth: true
                                    }}
                                    labelProps={{
                                      className: classes.formElement
                                    }}
                                    selectProps={{
                                      className: classes.formElement,
                                      autoWidth: true,
                                      ...field,
                                      input: (
                                        <Input
                                          name={`activities.${index}.projectTaskId`}
                                        />
                                      ),
                                    }}
                                  >
                                    {projects[activity.projectId] && projects[activity.projectId].tasks && projects[activity.projectId].tasks.map(
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
                                render={fieldProps => {
                                  return <Time
                                    {...fieldProps}
                                    className={classes.formElement}
                                    name=""
                                  />;
                                }}
                              />
                              <Field
                                value={activity.description}
                                name={`activities.${index}.description`}
                                render={fieldProps => (
                                  <TextField
                                    label="Description"
                                    className={classes.formElement}
                                    {...fieldProps}
                                  />
                                )}
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
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          arrayHelpers.push({
                            projectId: Object.keys(projects)[0],
                            projectTaskId: -1,
                            length: 0,
                            description: '',
                          })
                        }
                      >
                        Add Activity
                      </Button>
                      <div>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
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
                  </div>)
                }


                }
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
};

export default withStyles(styles)(ClockOutForm);
