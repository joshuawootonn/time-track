import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Typography,
  Button,
  Tooltip,
  IconButton
} from '@material-ui/core';
import cx from 'classnames';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import TextField from 'components/inputs/TextField';
import Switch from 'components/inputs/Switch';
import styles from './styles';

import TypeableSelect from 'components/inputs/TypeableSelect';

export class Employee extends Component {
  render() {
    const {
      classes,
      crews,
      authorities,
      label,
      isSubmitting,
      type,
      removeEmployee,
      resetForm,
      initialValues,
      errors,
      clearFilter
    } = this.props;

    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {type === `edit` && (
              <Tooltip title="Delete">
                <IconButton onClick={removeEmployee} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="firstName"
              component={TextField}
              margin="none"
              label="First Name"
              type="search"
              className={classes.field}
              helper="normal"
            />
            <Field
              name="lastName"
              component={TextField}
              margin="none"
              label="Last Name"
              type="search"
              className={classes.field}
              helper="normal"
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="authorityId"
              component={TypeableSelect}
              items={authorities}
              type="type"
              fullWidth
              label="Authority"
              className={classes.field}
            />
            <Field
              name="crewId"
              component={TypeableSelect}
              items={crews}
              type="name"
              fullWidth
              label="Crew"
              className={classes.field}
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <div className={cx(classes.field, classes.switchBox)}>
              <Field
                name="isEmployed"
                component={Switch}
                label="Is Employed"
                className={classes.field}
              />
              <Field
                name="isWorking"
                component={Switch}
                label="Is Working"
                className={classes.field}
              />
            </div>

            <Field
              name="pin"
              component={TextField}
              margin="none"
              label="Pin"
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
                id={EMPLOYEE_FORM_SUBMIT_BUTTON_ID}
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                variant="contained"
                className={classes.button}
              >
                {[`filter`].includes(type) ? `Apply` : `Save`}
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                id={EMPLOYEE_FORM_RESET_BUTTON_ID}
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
                    resetForm(initialValues);
                    clearFilter();
                  }}
                  id={EMPLOYEE_FORM_CLEAR_BUTTON_ID}
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
    );
  }
}

export const EMPLOYEE_FORM_RESET_BUTTON_ID = `employee_form_reset_button`;
export const EMPLOYEE_FORM_CLEAR_BUTTON_ID = `employee_form_clear_button`;
export const EMPLOYEE_FORM_SUBMIT_BUTTON_ID = `employee_form_submit_button`;

Employee.propTypes = {
  classes: PropTypes.object.isRequired,
  authorities: PropTypes.array.isRequired,
  crews: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeEmployee: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  clearFilter: PropTypes.func
};

export default withStyles(styles)(Employee);
