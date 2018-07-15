import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { Field, Form } from 'formik';

import styles from './styles';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]

class AccountSigin extends Component {
  render() {
    const { classes, id, isSubmitting } = this.props;
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <Form>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Field component={WrappedTextField} name="pin" type="password" label="Pin" />
              </Grid>
              {numbers.map((num, i) => {
                return <Grid key={i} item xs={4} >
                  <Button variant="outlined">{num}</Button>
                </Grid>
              })}
              <Grid item xs={4}>
                <Button variant="outlined">Clear</Button>
              </Grid>
              <Grid item xs={4}>
                <Button type="submit" disabled={isSubmitting} variant="outlined">Enter</Button>
              </Grid>
            </Grid>

          </Form>


        </div>
      </div>
    )
  }
}
export default withStyles(styles)(AccountSigin)


const WrappedTextField = ({ field, ...rest, id, label, type }) =>
  <div>
    <TextField
      {...field}
      {...rest}
      id={id}
      label={label}
      type={type}
      fullWidth
      margin="normal"
    />
    {/* {form.errors[field.name] 
        && form.touched[field.name] 
           && <div>{form.errors[field.name]}</div>} */}
  </div>