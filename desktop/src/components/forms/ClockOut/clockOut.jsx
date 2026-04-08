import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Grid,
  Typography,
  IconButton,
  MenuItem,
  SvgIcon,
} from '@material-ui/core'
import {
  AccessTime as TimeIcon,
  Timer as DurationIcon,
  Today as DateIcon,
  Close,
} from '@material-ui/icons'
import { Field, FieldArray } from 'formik'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

import ErrorBoundary from '~/components/utils/ErrorBoundary'
import Select from '~/components/inputs/Select'
import Time from '~/components/inputs/Time'

import styles from './styles'

import { minutesToString, minutesRoudedTime } from '~/helpers/time'

export function Clockout(props) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [keyboardValue] = useState(``)
  const [currentTextField, setCurrentTextField] = useState(null)
  const [keyboardLayout, setKeyboardLayout] = useState(`default`)
  const [activeJobIndex, setActiveJobIndex] = useState(0)
  const keyboardRef = useRef(null)

  const handleShift = () => {
    setKeyboardLayout((layout) => (layout === `default` ? `shift` : `default`))
  }

  const onChange = (input) => {
    if (currentTextField !== null && props.setFieldValue) {
      props.setFieldValue(currentTextField, input)
    }
  }

  const onKeyPress = (button) => {
    if (button === `{shift}`) handleShift()
  }

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
    generalError,
  } = props

  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.formHeaderBar}>
              <div className={classes.formHeaderContent}>
                <div className={classes.formHeaderSection}>
                  <SvgIcon className={classes.formHeaderIcon} color="action">
                    <DateIcon />
                  </SvgIcon>
                  <Typography variant="h5">{shift.date}</Typography>
                </div>

                <div className={classes.formHeaderMiddle}>
                  <SvgIcon className={classes.formHeaderIcon} color="action">
                    <TimeIcon />
                  </SvgIcon>
                  <Typography variant="h5">
                    {shift.in} - {shift.out}
                  </Typography>
                </div>

                <div className={classes.formHeaderSection}>
                  <SvgIcon className={classes.formHeaderIcon} color="action">
                    <DurationIcon />
                  </SvgIcon>
                  <Typography variant="h5">Length: {length}</Typography>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FieldArray
                name="activities"
                render={(jobHelpers) => {
                  return (
                    <div>
                      {values.activities &&
                        values.activities.map((job, jobIndex) => {
                          return (
                            <div
                              key={jobIndex}
                              className={cx(
                                classes.card,
                                classes.verticalCenterBox,
                              )}
                              onClick={() => setActiveJobIndex(jobIndex)}
                              style={{
                                cursor: 'pointer',
                                outline:
                                  jobIndex === activeJobIndex
                                    ? `2px solid #faab1a`
                                    : '2px solid transparent',
                                borderRadius: '4px',
                                backgroundColor:
                                  jobIndex === activeJobIndex
                                    ? `rgba(250, 171, 26, 0.1)`
                                    : 'transparent',
                              }}
                            >
                              <div className={classes.formBody}>
                                {/* Project row */}
                                <div className={classes.projectLine}>
                                  <Field
                                    className={classes.projectField}
                                    name={`activities.${jobIndex}.projectId`}
                                    component={Select}
                                    items={projects}
                                    fullWidth
                                    label="Project"
                                    menuItemClassName={classes.projectDropdown}
                                    errorTextStyles={classes.errorText}
                                  />
                                  <IconButton
                                    type="button"
                                    id={`${CLOCKOUT_FORM_REMOVE_ACTIVTIY}_${jobIndex}`}
                                    color="secondary"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      jobHelpers.remove(jobIndex)
                                      setActiveJobIndex(
                                        Math.max(0, activeJobIndex - 1),
                                      )
                                    }}
                                  >
                                    <Close className={classes.deleteButton} />
                                  </IconButton>
                                </div>

                                {/* Task rows inside this job */}
                                {job.tasks &&
                                  job.tasks.map((task, taskIndex) => (
                                    <div
                                      key={taskIndex}
                                      className={classes.taskLine}
                                    >
                                      <Field
                                        className={classes.taskField}
                                        name={`activities.${jobIndex}.tasks.${taskIndex}.projectTaskId`}
                                        component={Select}
                                        fullWidth
                                        label="Task"
                                        menuItemClassName={classes.taskMenuItem}
                                        errorTextStyles={classes.errorText}
                                      >
                                        {projectTasks
                                          .filter(
                                            (pt) =>
                                              job.projectId === pt.projectId,
                                          )
                                          .map((pt, i) => (
                                            <MenuItem
                                              key={i}
                                              value={pt.id}
                                              className={classes.taskMenuItem}
                                            >
                                              {pt.task.name}
                                            </MenuItem>
                                          ))}
                                      </Field>
                                      <Field
                                        name={`activities.${jobIndex}.tasks.${taskIndex}.length`}
                                        component={Time}
                                        fullWidth
                                        className={classes.taskField}
                                        menuItemClassName={classes.taskMenuItem}
                                        errorTextStyles={classes.errorText}
                                      />
                                      <IconButton
                                        type="button"
                                        color="secondary"
                                        className={classes.iconButton}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          const newTasks = job.tasks.filter(
                                            (_, i) => i !== taskIndex,
                                          )
                                          jobHelpers.form.setFieldValue(
                                            `activities.${jobIndex}.tasks`,
                                            newTasks,
                                          )
                                        }}
                                      >
                                        <Close />
                                      </IconButton>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )
                        })}

                      <Grid item xs={12} className={classes.formFooter}>
                        <div className={classes.formFooterRow}>
                          <div>
                            <Button
                              onClick={cancel}
                              color="secondary"
                              variant="text"
                              className={classes.clockOutLargeButtons}
                            >
                              Cancel
                            </Button>
                          </div>

                          <div className={classes.lunchBox}>
                            <Typography className={classes.lunchLabel}>
                              Lunch
                            </Typography>
                            <Field
                              name={`lunch`}
                              label1="hrs"
                              label2="mins"
                              helper="none"
                              fullWidth
                              margin="none"
                              component={Time}
                              className={cx(
                                classes.taskField,
                                classes.lunchTimeField,
                              )}
                              menuItemClassName={classes.taskMenuItem}
                              // errorTextStyles={classes.errorText}
                            />
                          </div>

                          <div>
                            <Button
                              color="primary"
                              variant="contained"
                              className={classes.clockOutRegularButtons}
                              id="clockout_add_job"
                              onClick={() => {
                                const newIndex = values.activities.length
                                jobHelpers.push({
                                  projectId: Object.keys(projects)[0],
                                  tasks: [
                                    {
                                      projectTaskId: -1,
                                      length: 0,
                                      description: ``,
                                    },
                                  ],
                                })
                                setActiveJobIndex(newIndex)
                              }}
                            >
                              Add Job
                            </Button>
                          </div>

                          <div>
                            <Button
                              color="primary"
                              variant="contained"
                              className={classes.clockOutRegularButtons}
                              id="clockout_add_task"
                              disabled={
                                !values.activities ||
                                values.activities.length === 0
                              }
                              onClick={() => {
                                const activeJob =
                                  values.activities[activeJobIndex]
                                if (!activeJob) return
                                const newTasks = [
                                  ...activeJob.tasks,
                                  {
                                    projectTaskId: -1,
                                    length: 0,
                                    description: ``,
                                  },
                                ]
                                jobHelpers.form.setFieldValue(
                                  `activities.${activeJobIndex}.tasks`,
                                  newTasks,
                                )
                              }}
                            >
                              Add Task
                            </Button>
                          </div>

                          <div className={classes.statsBox}>
                            <Typography variant="h5">
                              Time Left: {minutesToString(timeLeft)}
                            </Typography>
                            <Typography variant="h5">
                              Week Total:{' '}
                              {minutesToString(
                                minutesRoudedTime(weekHourTotal),
                              )}
                            </Typography>
                            <Typography
                              variant="body1"
                              margin="none"
                              className={classes.error}
                            >
                              {generalError}
                            </Typography>
                          </div>

                          <div>
                            <Button
                              type="submit"
                              color="primary"
                              className={classes.clockOutLargeButtons}
                              disabled={
                                isSubmitting ||
                                Object.keys(errors).length !== 0 ||
                                timeLeft !== 0 ||
                                !!generalError
                              }
                              variant="contained"
                            >
                              Clock Out
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    </div>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.keyboardGrid}>
            <div
              className={classes.keyboard}
              style={isKeyboardVisible ? {} : { display: `none` }}
            >
              <ErrorBoundary>
                <Keyboard
                  ref={keyboardRef}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  preventMouseDownDefault={true}
                  keyboardLayout={keyboardLayout}
                  layout={{
                    default: [
                      `\` 1 2 3 4 5 6 7 8 9 0 {bksp}`,
                      `q w e r t y u i o p [ ] \\`,
                      `a s d f g h j k l ; '`,
                      `{shift} z x c v b n m , . /`,
                      `{space}`,
                    ],
                    shift: [
                      `~ ! @ # $ % ^ & * ( ) {bksp}`,
                      `Q W E R T Y U I O P { } |`,
                      `A S D F G H J K L : " `,
                      `{shift} Z X C V B N M < > ?`,
                      `{space}`,
                    ],
                  }}
                />
              </ErrorBoundary>
            </div>
          </Grid>
        </form>
      </div>
    </div>
  )
}

export const CLOCKOUT_FORM_REMOVE_ACTIVTIY = `clockout_form_remove_activity`
export const CLOCKOUT_FORM_ADD_ACTIVTIY = `clockout_form_add_activity`

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
  generalError: PropTypes.string,
}

export default withStyles(styles)(Clockout)
