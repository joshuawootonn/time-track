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
  } = props;
  console.log(shift)
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.lineBox}>

              <Typography variant="display2">Clock Out</Typography>
              
              <div className={classes.verticalCenterBox}>
                <SvgIcon  className={classes.headlineIcon}  color="action"><DateIcon /></SvgIcon>
                <Typography variant="headline">{shift.date}</Typography>
              </div>

              <div className={classes.verticalCenterBox}>
                <SvgIcon  className={classes.headlineIcon}  color="action"><TimeIcon /></SvgIcon>
                <Typography variant="headline">{shift.in} - {shift.out}</Typography>
              </div>

              <div className={classes.verticalCenterBox}>
                <SvgIcon className={classes.headlineIcon} color="action"><DurationIcon /></SvgIcon>
                <Typography variant="headline">Length:  {shift.length}</Typography>
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
                          <div key={index} className={cx(classes.card, classes.horizontalBox)}>
                            <div className={classes.card}>
                              <div className={classes.horizontalBox}>
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
                                  render={fieldProps => {
                                    return <Time {...fieldProps} name="" />;
                                  }}
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


                              </div>
                            </div>
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
