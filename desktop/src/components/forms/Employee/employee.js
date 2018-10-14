import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button } from '@material-ui/core';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';


import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import Switch from 'components/inputs/Switch';
import styles from './styles';

class Employee extends Component {
  render() {
    const { classes, crews, authorities, label, isSubmitting } = this.props;
    return (
      <Form>

        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {label}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="firstName"
              component={TextField}
              margin="none"
              label="First Name"
              type="search"
              className={classes.field}
              helper="normal"
            />
            <Field
              name="lastName"
              component={TextField}
              margin="none"
              label="Last Name"
              type="search"
              className={classes.field}
              helper="normal"
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
          <Grid item xs={12} className={classes.row}>
            <Field
              name="isEmployed"
              component={Switch}
              label="Employed"
              className={classes.field}
            />
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
                //onClick={cancel}
                disabled={isSubmitting}
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

    );
  }
}

Employee.propTypes = {
  classes: PropTypes.object.isRequired,
  authorities: PropTypes.array.isRequired,
  crews: PropTypes.array.isRequired
};

export default withStyles(styles)(Employee);