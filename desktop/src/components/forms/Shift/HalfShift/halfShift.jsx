import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button, Paper } from '@material-ui/core';
import cx from 'classnames';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import TextField from '~/components/inputs/TextField';
import TypeableSelect from '~/components/inputs/TypeableSelect';

import styles from './styles';

import { minutesToString } from '~/helpers/time';
export class HalfShift extends Component {
  render() {
    const {
      classes,
      isSubmitting,
      resetForm,
      initialValues,
      errors,
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
          </Grid>

          <Grid item xs={12} className={cx(classes.row, classes.footerRow)}>
            <Typography variant="h5" margin="none">
              Current Shift Length: {minutesToString(timeLeft)}
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
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                variant="contained"
                id={ANALYZE_SHIFT_HALF_SHIFT_SUBMIT_BUTTON_ID}
                className={classes.button}
              >
                Save Clock In
              </Button>

              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                color="secondary"
                variant="text"
                id={ANALYZE_SHIFT_HALF_SHIFT_RESET_BUTTON_ID}
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

export const ANALYZE_SHIFT_HALF_SHIFT_RESET_BUTTON_ID = `analyze_shift_half_shift_reset_button`;
export const ANALYZE_SHIFT_HALF_SHIFT_SUBMIT_BUTTON_ID = `analyze_shift_half_shift_submit_button`;

HalfShift.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  timeLeft: PropTypes.number.isRequired,
  generalError: PropTypes.string
};

export default withStyles(styles)(HalfShift);
