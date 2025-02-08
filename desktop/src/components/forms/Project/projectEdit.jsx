import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Typography,
  Button,
  IconButton,
  TextField as MUTextField,
} from '@material-ui/core'
import cx from 'classnames'
import { Field, Form, FieldArray } from 'formik'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'

import TextField from '~/components/inputs/TextField'
import Switch from '~/components/inputs/Switch'
import styles from './styles'

import TypeableSelect from '~/components/inputs/TypeableSelect'
import { minutesToString } from '~/helpers/time'
import { act } from 'react-dom/test-utils'

const useStyles = makeStyles((theme) => ({
  displayElement: {
    margin: `auto 8px`,
  },
}))

const DisplayElement = ({ label, value }) => {
  const classes = useStyles()
  return (
    <MUTextField
      fullWidth
      label={label}
      value={value}
      InputProps={{ disabled: true }}
      FormHelperTextProps={{ error: true }}
      helperText={` `}
      className={classes.displayElement}
    />
  )
}

const EstimatedTimeOverQuantity = ({
  projectTask: { estimateTime, quantity },
}) => (
  <DisplayElement
    label="Estimated / Quantity"
    value={
      quantity === 0 ? 0 : Math.round(100 * (estimateTime / quantity)) / 100
    }
  />
)

const ActualTime = ({ projectTask: { actualTime } }) => (
  <DisplayElement label="Actual Time" value={minutesToString(actualTime)} />
)

const ActualTimeOverQuantity = ({ projectTask: { actualTime, quantity } }) => (
  <DisplayElement
    label="Actual / Quantity"
    value={!quantity ? 0 : Math.round(100 * (actualTime / quantity)) / 100}
  />
)

const ActualTimeOverEstimateTime = ({
  projectTask: { estimateTime, actualTime },
}) => (
  <DisplayElement
    label="Percent Complete"
    value={`${Math.round(100 * (actualTime / 60 / estimateTime))} %`}
  />
)
const TotalEstimateTime = ({ estimateTime }) => (
  <DisplayElement label="Total Estimate" value={estimateTime} />
)
const TotalActualTime = ({ actualTime }) => (
  <DisplayElement label="Total Actual" value={minutesToString(actualTime)} />
)
const TotalPercentage = ({ estimateTime, actualTime }) => (
  <DisplayElement
    label="Percent Complete"
    value={
      estimateTime && actualTime
        ? `${Math.round(100 * (actualTime / 60 / estimateTime))} %`
        : '0 %'
    }
  />
)

export class ProjectEdit extends Component {
  render() {
    const {
      classes,
      tasks,
      isSubmitting,
      resetForm,
      initialValues,
      errors,
      values,
      goToShifts,
    } = this.props

    const { totalActualTime, totalEstimateTime } = values.projectTasks.reduce(
      ({ totalActualTime, totalEstimateTime }, projectTask) => {
        const estimatedTimeOption = parseInt(projectTask.estimateTime)
        return {
          totalActualTime: totalActualTime + projectTask.actualTime,
          totalEstimateTime:
            totalEstimateTime + (estimatedTimeOption ? estimatedTimeOption : 0),
        }
      },
      { totalActualTime: 0, totalEstimateTime: 0 },
    )

    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">Edit</Typography>

            <Button onClick={goToShifts}>Recent Shifts</Button>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="jobNumber"
              component={TextField}
              margin="none"
              label="Job #"
              type="search"
              className={classes.field}
              helper="normal"
            />

            <Field
              name="name"
              component={TextField}
              fullWidth={false}
              margin="none"
              label="Project Name"
              type="search"
              className={classes.field}
              helper="normal"
            />

            <Field
              name="date"
              component={TextField}
              margin="none"
              label="Start Date"
              type="date"
              className={classes.field}
              helper="normal"
            />
            <Field
              name="isActive"
              component={Switch}
              label="Active"
              className={classes.field}
            />
          </Grid>
          <Grid item xs={12} container className={classes.body}>
            <Grid item xs={12}>
              <div className={cx(classes.row, classes.totalRow)}>
                <span className={classes.taskField} />
                <span className={classes.spacer} />
                <TotalEstimateTime estimateTime={totalEstimateTime} />

                <span className={classes.spacer} />
                <TotalActualTime actualTime={totalActualTime} />

                <span className={classes.spacer} />
                <TotalPercentage
                  actualTime={totalActualTime}
                  estimateTime={totalEstimateTime}
                />
              </div>
            </Grid>
          </Grid>
          <FieldArray
            name="projectTasks"
            render={(arrayHelpers) => (
              <>
                <Grid
                  item
                  xs={12}
                  container
                  className={cx(classes.body, classes.scroll)}
                >
                  {values.projectTasks &&
                    values.projectTasks.map((projectTask, index) => (
                      <Grid item xs={12} key={index}>
                        <div className={cx(classes.row)}>
                          <Field
                            name={`projectTasks.${index}.taskId`}
                            component={TypeableSelect}
                            type="name"
                            items={tasks}
                            fullWidth
                            label="Task"
                            className={classes.taskField}
                          />
                          <Field
                            name={`projectTasks.${index}.quantity`}
                            component={TextField}
                            fullWidth
                            label="Quantity"
                            className={classes.field}
                          />
                          <Field
                            name={`projectTasks.${index}.estimateTime`}
                            component={TextField}
                            fullWidth
                            label="Estimated Time"
                            className={classes.field}
                          />
                          <EstimatedTimeOverQuantity
                            projectTask={projectTask}
                          />
                          <ActualTime projectTask={projectTask} />
                          <ActualTimeOverQuantity projectTask={projectTask} />
                          <ActualTimeOverEstimateTime
                            projectTask={projectTask}
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
                      </Grid>
                    ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={cx(classes.row, classes.footerRow)}
                >
                  <div className={classes.lunchBox}></div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() =>
                      arrayHelpers.push({
                        categoryId: -1,
                        subcategoryId: -1,
                        taskId: -1,
                        quantity: 1,
                        estimateTime: 1,
                      })
                    }
                  >
                    Add Task
                  </Button>
                </Grid>
              </>
            )}
          />
          <Grid item xs={12} className={classes.row}>
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
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                variant="contained"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues)
                }}
                disabled={isSubmitting}
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
    )
  }
}

ProjectEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  projectTaskObject: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeProject: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.array,
  subcategories: PropTypes.array,
  values: PropTypes.object.isRequired,
  tasks: PropTypes.array,
  clearFilter: PropTypes.func,
  goToShifts: PropTypes.func,
}

export default withStyles(styles)(ProjectEdit)
