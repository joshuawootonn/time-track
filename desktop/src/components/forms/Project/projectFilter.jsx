import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button } from '@material-ui/core';
import cx from 'classnames';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import TextField from '~/components/inputs/TextField';
import Switch from '~/components/inputs/Switch';
import styles from './styles';

export class ProjectFilter extends Component {
  render() {
    const {
      classes,
      isSubmitting,
      resetForm,
      initialValues,
      errors
    } = this.props;

    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">Filter</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="name"
              component={TextField}
              margin="none"
              label="Project Name"
              type="search"
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

          <Grid item xs={12} className={classes.row}>
            <Field
              name="startTime"
              component={TextField}
              margin="none"
              label="Start Date"
              type="date"
              className={classes.field}
              helper="normal"
            />
            <Field
              name="endTime"
              component={TextField}
              margin="none"
              label="End Date"
              type="date"
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
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                variant="contained"
                className={classes.button}
              >
                Apply
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>

              <Button
                onClick={() => {
                  resetForm(initialValues);
                  this.props.clearFilter();
                }}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
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

ProjectFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeProject: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearFilter: PropTypes.func
};

export default withStyles(styles)(ProjectFilter);
