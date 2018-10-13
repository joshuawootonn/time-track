import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles'

import TextField from 'components/inputs/TextField';
import styles from './styles';

class Employee extends Component {
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="firstName"
              component={TextField}
              margin="none"
              label="First Name"
              type="search"
              className={classes.field}
            />
            <Field
              name="lastName"
              component={TextField}
              margin="none"
              label="Last Name"
              type="search"
              className={classes.field}
            />
          </Grid>
          
        </Grid>
      </Form>

    )
  }
}


export default withStyles(styles)(Employee);