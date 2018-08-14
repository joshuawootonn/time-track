import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { Field, Form } from 'formik';
import moment from 'moment';

import styles from './styles';

import Test from './test';

class ClockOutForm extends Component {

  render() {
    const { classes, isSubmitting, cancel, shift,values } = this.props;
    console.log(values)
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <Form>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <div className={classes.lineBox}>
                  <Typography variant="title" >
                    Date:
                  </Typography>
                  <Typography variant="title" >
                    {shift.date}
                  </Typography>
                </div>
                <div className={classes.lineBox}>
                  <Typography variant="title" >
                    Time:
                  </Typography>
                  <Typography variant="title" >
                    {shift.in} - {shift.out}
                  </Typography>
                </div>
                <div className={classes.lineBox}>
                  <Typography variant="title" >
                    Time Worked:
                  </Typography>
                  <Typography variant="title" >
                    {shift.length}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Test values={values} />
              </Grid>
              <Grid item xs={12} >
                <div className={classes.buttonBox} >
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    variant="contained"
                    className={classes.button}
                  >
                    Enter
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
