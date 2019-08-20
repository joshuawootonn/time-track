import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { Field, Form } from 'formik';

import styles from './styles';
import Password from 'components/inputs/Password';

export class AccountSigin extends Component {
  appendPin = newChar => {
    if (this.props.values.pin.length >= 6) return;
    this.props.setFieldValue(`pin`, this.props.values.pin + newChar, true);
  };
  resetPin = () => {
    this.props.setFieldValue(`pin`, ``, false);
  };

  render() {
    const { classes, isSubmitting, errors } = this.props;

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
                  helper="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(7)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${7}`}
                >
                  {7}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(8)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${8}`}
                >
                  {8}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(9)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${9}`}
                >
                  {9}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(4)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${4}`}
                >
                  {4}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(5)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${5}`}
                >
                  {5}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(6)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${6}`}
                >
                  {6}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(3)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${3}`}
                >
                  {3}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(2)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${2}`}
                >
                  {2}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(1)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${1}`}
                >
                  {1}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => this.appendPin(0)}
                  variant="contained"
                  className={classes.button}
                  id={`button-${0}`}
                >
                  {0}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={this.resetPin}
                  color="secondary"
                  variant="contained"
                  className={classes.button}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || Object.keys(errors).length !== 0}
                  variant="contained"
                  className={classes.button}
                >
                  Enter
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.centerText} color="error">
                  {errors.submit}
                </Typography>
              </Grid>
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}

AccountSigin.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountSigin);
