import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles'

import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select'
import styles from './styles';

class Employee extends Component {
  render() {
    const { classes, crews, authorities } = this.props;
    console.log(this.props.values);
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
          <Grid item xs={12} className={classes.row}>
            <Field
              name="authorityId"
              component={Select}
              items={authorities}
              fullWidth
              label="Authority"
              className={classes.field}
            />
            <Field
              name="crewId"
              component={Select}
              items={crews}
              fullWidth
              label="Crew"
              className={classes.field}
            />
          </Grid>

        </Grid>
      </Form>

    )
  }
}


export default withStyles(styles)(Employee);