import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Field, Form } from 'formik';

import styles from './styles';


class ClockOutForm extends Component {
  
  render() {
    const { classes, isSubmitting } = this.props;
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <Form>
            <Grid container spacing={24}>
                       
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                >
                  Enter
                </Button>
                <Button
                  onClick={this.resetPin}
                  color="secondary"
                  variant="text"
                >
                  Cancel
                </Button>
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}

ClockOutForm.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
};

export default withStyles(styles)(ClockOutForm);
