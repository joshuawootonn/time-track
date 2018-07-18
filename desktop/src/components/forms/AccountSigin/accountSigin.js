import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Field, Form } from 'formik';

import styles from './styles';
import Password from 'components/inputs/Password'

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

class AccountSiginForm extends Component {
  render() {
    const { classes, isSubmitting } = this.props;
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <Form>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Field
                  component={Password}
                  name="pin"
                  label="Pin"
                />
              </Grid>
              {numbers.map((num, i) => {
                return (
                  <Grid key={i} item xs={4}>
                    <Button variant="contained">{num}</Button>
                  </Grid>
                );
              })}
              <Grid item xs={4}>
                <Button 
                  color="secondary"
                  variant="contained"
                >Clear</Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                >
                  Enter
                </Button>
              </Grid>
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}

AccountSiginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AccountSiginForm);
