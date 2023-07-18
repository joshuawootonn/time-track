import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button } from '@material-ui/core';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import TextField from '~/components/inputs/TextField';
import styles from './styles';

export class Authority extends Component {
  render() {
    const {
      classes,
      errors,
      initialValues,
      resetForm,
      isSubmitting,
      label
    } = this.props;
    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.row}>
            <Typography variant="h6">{label}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="type"
              component={TextField}
              margin="none"
              label="Type"
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
                color="primary"
                disabled={isSubmitting}
                variant="contained"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                id="authority-reset-button"
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
    );
  }
}

Authority.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(Authority);
