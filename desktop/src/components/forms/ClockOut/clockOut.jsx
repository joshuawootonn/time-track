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
  SvgIcon
} from '@material-ui/core';
import {
  AccessTime as TimeIcon,
  Timer as DurationIcon,
  Today as DateIcon,
  Close
} from '@material-ui/icons';
import { Field, FieldArray } from 'formik';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import ErrorBoundary from '~/components/utils/ErrorBoundary';
import TextField from '~/components/inputs/TextField';
import Select from '~/components/inputs/Select';
import Time from '~/components/inputs/Time';

import styles from './styles';

import { minutesToString, minutesRoudedTime } from '~/helpers/time';

export class Clockout extends Component {
  state = {
    isKeyboardVisible: false,
    keyboardValue: ``,
    currentTextField: null,
    keyboardLayout: `default`
  };
  handleShift = () => {
    const { keyboardLayout } = this.state;
    this.setState({
      keyboardLayout: keyboardLayout === `default` ? `shift` : `default`
    });
  };
  onChange = input => {
    if (this.state.currentTextField !== null) {
      this.props.setFieldValue(this.state.currentTextField, input);
    }
  };
  onKeyPress = button => {
    if (button === `{shift}`) this.handleShift();
  };
  onDescriptionFocus = (input, asdf) => {
    this.setState({ isKeyboardVisible: true, currentTextField: asdf });
  };
  onDescriptionBlur = () => {
    this.setState({ isKeyboardVisible: false, currentTextField: null });
  };
  render() {
    const {
      classes,
      isSubmitting,
      handleSubmit,
      shift,
      values,
      length,
      projects,
      projectTasks,
      cancel,
      errors,
      timeLeft,
      weekHourTotal,
      generalError
    } = this.props;
    const { keyboardLayout } = this.state;

    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.formHeader}>
                <Typography variant="h3">Clock Out</Typography>

                <div className={classes.formHeader}>
                  <SvgIcon className={classes.formHeaderIcon} color="action">
                    <DateIcon />
                  </SvgIcon>
                  <Typography variant="h5">{shift.date}</Typography>
                </div>

                <div className={classes.formHeader}>
                  <SvgIcon className={classes.formHeaderIcon} color="action">
                    <TimeIcon />
                  </SvgIcon>
                  <Typography variant="h5">
                    {shift.in} - {shift.out}
                  </Typography>
                </div>

                <div className={classes.formHeader}>
                  <SvgIcon className={classes.formHeaderIcon} color="action">
                    <DurationIcon />
                  </SvgIcon>
                  <Typography variant="h5">Length: {length}</Typography>
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
                                  classes.verticalCenterBox
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
                                    {projectTasks // This code iterates the projectTask
                                      .filter(projectTask => {
                                        return (
                                          activity.projectId ===
                                          projectTask.projectId
                                        ); // filters based on project selected
                                      })
                                      .map((projectTask, i) => {
                                        // maps those elements
                                        return (
                                          <MenuItem
                                            key={i}
                                            value={projectTask.id}
                                          >
                                            {projectTask.task.name}
                                          </MenuItem>
                                        );
                                      })}
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
                                    onFocus={e => {
                                      this.onDescriptionFocus(
                                        e,
                                        `activities.${index}.description`
                                      );
                                    }}
                                    onBlur={this.onDescriptionBlur}
                                  />
                                  <div className={classes.verticalCenter}>
                                    <IconButton
                                      type="button"
                                      id={`${CLOCKOUT_FORM_REMOVE_ACTIVTIY}_${index}`}
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
                            id={`${CLOCKOUT_FORM_ADD_ACTIVTIY}`}
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

                        <Grid item xs={12} className={classes.formFooter}>
                          <Typography variant="h5" margin="none">
                            Time Left: {minutesToString(timeLeft)}
                          </Typography>
                          <Typography variant="h5" margin="none">
                            Week Total:{' '}
                            {minutesToString(minutesRoudedTime(weekHourTotal))}
                          </Typography>
                          <Typography
                            variant="body1"
                            margin="none"
                            className={classes.error}
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
                                timeLeft !== 0 ||
                                !!generalError
                              }
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
            <Grid container spacing={3} className={classes.keyboardGrid}>
              <div
                className={classes.keyboard}
                style={this.state.isKeyboardVisible ? {} : { display: `none` }}
              >
                <ErrorBoundary>
                  <Keyboard
                    ref={r => (this.keyboardRef = r)}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    preventMouseDownDefault={true}
                    keyboardLayout={keyboardLayout}
                    layout={{
                      default: [
                        `\` 1 2 3 4 5 6 7 8 9 0 {bksp}`,
                        `q w e r t y u i o p [ ] \\`,
                        `a s d f g h j k l ; '`,
                        `{shift} z x c v b n m , . /`,
                        `{space}`
                      ],
                      shift: [
                        `~ ! @ # $ % ^ & * ( ) {bksp}`,
                        `Q W E R T Y U I O P { } |`,
                        `A S D F G H J K L : " `,
                        `{shift} Z X C V B N M < > ?`,
                        `{space}`
                      ]
                    }}
                  />
                </ErrorBoundary>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

export const CLOCKOUT_FORM_REMOVE_ACTIVTIY = `clockout_form_remove_activity`;
export const CLOCKOUT_FORM_ADD_ACTIVTIY = `clockout_form_add_activity`;

Clockout.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func,
  shift: PropTypes.object,
  projects: PropTypes.array,
  projectTasks: PropTypes.array,
  cancel: PropTypes.func,
  errors: PropTypes.object,
  timeLeft: PropTypes.number,
  weekHourTotal: PropTypes.number,
  length: PropTypes.string,
  generalError: PropTypes.string
};

export default withStyles(styles)(Clockout);
