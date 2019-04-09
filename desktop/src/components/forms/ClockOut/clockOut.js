import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, IconButton, MenuItem, SvgIcon } from '@material-ui/core';
import { AccessTime as TimeIcon, Timer as DurationIcon, Today as DateIcon, Close } from '@material-ui/icons';
import { Field, FieldArray } from 'formik';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import Time from 'components/inputs/Time';

import styles from './styles';

import { minutesToString, minutesRoudedTime } from 'helpers/time';

export class Clockout extends Component{
  state = {
    isKeyboardVisisble: false,
    keyboardValue: '',
    currentTextField: null
  }
  onChange = input => {
    console.log('ONchange: ',input);
    if(this.state.currentTextField !== null){
      this.props.setFieldValue(this.state.currentTextField,input);
    }
  }
  onKeyPress = button => {
    console.log('ONKeyPress: ',button);
  }
  on = (input, asdf) => {
    // console.log('on',input,asdf);
    this.setState({ isKeyboardVisisble: true, currentTextField: asdf });
    //this.keyboardRef.keyboard.setInput(input);
  }
  off = () => {
    // console.log('off');
    this.setState({ isKeyboardVisisble: false,currentTextField: null });
    //this.keyboardRef.keyboard.clearInput();
  }
  render() {
    const { classes, isSubmitting, handleSubmit, shift, values, 
      projects, projectTasks, cancel, errors,timeLeft,generalError,setFieldValue } = this.props;
    
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={24}>
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
                  <Typography variant="h5">
                    Length: {shift.length}
                  </Typography>
                </div>
              </Grid>
  
              <Grid item xs={12}>
                <FieldArray
                  name="activities"
                  id="activities"
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
                                    onFocus={e => {
                                      this.on(e,`activities.${index}.description`);                                      
                                    }}
                                    onBlur={this.off}
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
                            id='add-activity'
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
                            Time Left: {minutesToString(minutesRoudedTime(timeLeft))}
                          </Typography>
                          <Typography variant="body1" margin="none" className={classes.error}>
                            {generalError}
                          </Typography>                      
  
                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              disabled={isSubmitting || Object.keys(errors).length !== 0 || minutesRoudedTime(timeLeft) !== 0 || !!generalError}
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
            <Grid container spacing={24} style={this.state.isKeyboardVisisble ? {} : { display: 'none' }}>
              <Keyboard 
                ref={r => (this.keyboardRef = r)}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                preventMouseDownDefault={true}
              />
            </Grid>
          </form>
        </div>
      </div>
    );
  }
  
}

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
  generalError: PropTypes.string
};

export default withStyles(styles)(Clockout);
