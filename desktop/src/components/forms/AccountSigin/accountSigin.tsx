import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { Field, Form } from 'formik';

import styles from './styles';
import Password from 'components/inputs/Password';

export interface Props {
  classes: any;
  isSubmitting: boolean;
  values: {
    pin: string;
  };
  setFieldValue: (key: string, value: any, something: boolean) => void;
  errors: any;
}

export class AccountSigin extends Component<Props> {
  appendPin = (newChar: number) => {
    if (this.props.values.pin.length >= 6) return;
    this.props.setFieldValue(`pin`, this.props.values.pin + newChar, true);
  };
  resetPin = () => {
    this.props.setFieldValue(`pin`, ``, false);
  };

  renderButtonGridElement = (num: number) => {
    const { classes } = this.props;
    return (
      <Grid item xs={4} key={num}>
        <Button
          onClick={() => this.appendPin(num)}
          variant="contained"
          className={classes.button}
          id={`button-${num}`}
        >
          {num}
        </Button>
      </Grid>
    );
  };

  render() {
    const { classes, isSubmitting, errors } = this.props;


    const numOrder: number[] = [7,8,9,4,5,6,1,2,3,0];

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
              {numOrder.map((num: number) => this.renderButtonGridElement(num))}              
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


export default withStyles(styles as any)(AccountSigin);
