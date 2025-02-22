import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Field, Form } from 'formik'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import styles from './styles'
import TextField from '~/components/inputs/TextField'

export class Trade extends Component {
  render() {
    const {
      label,
      removeTrade,
      type,
      classes,
      isSubmitting,
      resetForm,
      initialValues,
      errors,
    } = this.props
    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {[`edit`].includes(type) && (
              <Tooltip title="Delete">
                <IconButton onClick={removeTrade}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="name"
              component={TextField}
              margin="none"
              label="Trade Name"
              type="search"
              className={classes.field}
              helper="normal"
            />
          </Grid>
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
                id={`${TRADE_FORM_SUBMIT_BUTTON_ID}`}
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                variant="contained"
                className={classes.button}
              >
                {[`add`, `edit`].includes(type) ? `Save` : `Apply`}
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues)
                }}
                id={`${TRADE_FORM_RESET_BUTTON_ID}`}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
              {[`filter`].includes(type) && (
                <Button
                  onClick={() => {
                    resetForm(initialValues)
                    this.props.clearFilter()
                  }}
                  id={`${TRADE_FORM_CLEAR_BUTTON_ID}`}
                  disabled={isSubmitting}
                  color="secondary"
                  variant="text"
                  className={classes.button}
                >
                  Clear
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Form>
    )
  }
}

export const TRADE_FORM_RESET_BUTTON_ID = `trade_form_reset_button`
export const TRADE_FORM_CLEAR_BUTTON_ID = `trade_form_clear_button`
export const TRADE_FORM_SUBMIT_BUTTON_ID = `trade_form_submit_button`

Trade.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  removeTrade: PropTypes.func,
  type: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  clearFilter: PropTypes.func,
}

export default withStyles(styles)(Trade)
