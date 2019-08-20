import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button } from '@material-ui/core';
import cx from 'classnames';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';

import styles from './styles';

export class Filter extends Component {
  render() {
    const {
      classes,
      isSubmitting,
      resetForm,
      initialValues,
      errors,
      projects,
      crews,
      authorities,
      label,
      employees,
      generalError
    } = this.props;
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">{label}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="employeeId"
              component={Select}
              items={employees}
              fullWidth
              className={classes.field}
              label="Employee"
            />
            <Field
              name="projectId"
              component={Select}
              items={projects}
              fullWidth
              className={classes.field}
              label="Project"
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="crewId"
              component={Select}
              items={crews}
              fullWidth
              className={classes.field}
              label="Crew"
            />
            <Field
              name="authorityId"
              component={Select}
              items={authorities}
              fullWidth
              className={classes.field}
              label="Authority"
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="startTime"
              component={TextField}
              margin="none"
              label="Start Date"
              type="datetime-local"
              className={classes.field}
              helper="normal"
            />
            <Field
              name="endTime"
              component={TextField}
              margin="none"
              label="End Date"
              type="datetime-local"
              className={classes.field}
              helper="normal"
            />
          </Grid>
          <Grid item xs={12} className={cx(classes.row, classes.footerRow)}>
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
                id={ANALYZE_SHIFT_FILTER_SUBMIT_BUTTON_ID}
                className={classes.button}
              >
                Apply
              </Button>

              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                color="secondary"
                variant="text"
                id={ANALYZE_SHIFT_FILTER_RESET_BUTTON_ID}
                className={classes.button}
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                  this.props.clearFilter();
                }}
                color="secondary"
                variant="text"
                id={ANALYZE_SHIFT_FILTER_CLEAR_BUTTON_ID}
                className={classes.button}
              >
                Clear
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export const ANALYZE_SHIFT_FILTER_RESET_BUTTON_ID = `analyze_shift_half_shift_reset_button`;
export const ANALYZE_SHIFT_FILTER_CLEAR_BUTTON_ID = `analyze_shift_half_shift_clear_button`;
export const ANALYZE_SHIFT_FILTER_SUBMIT_BUTTON_ID = `analyze_shift_half_shift_submit_button`;

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  crews: PropTypes.array.isRequired,
  authorities: PropTypes.array.isRequired,
  generalError: PropTypes.string,
  clearFilter: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(Filter);
