import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  Grid,  Typography,  Button,  Tooltip,  IconButton } from '@material-ui/core';
import cx from 'classnames';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import Switch from 'components/inputs/Switch';
import styles from './styles';

export class Employee extends Component {
  render() { 
    const { classes, crews, authorities, label, isSubmitting, type, removeEmployee, resetForm, initialValues,errors  } = this.props;
    
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow,classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {type === `edit` && (
              <Tooltip title="Delete">
                <IconButton onClick={removeEmployee} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
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
            <div className={cx(classes.field,classes.switchBox)}>
              <Field
                name="isEmployed"
                component={Switch}
                label="Is Employed"
                className={classes.field}
              />
              <Field
                name="isWorking"
                component={Switch}
                label="Is Working"
                className={classes.field}
              />
            </div>

            <Field
              name="pin"
              component={TextField}
              margin="none"
              label="Pin"
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
                disabled={isSubmitting || Object.keys(errors).length !== 0 }
                variant="contained"
                className={classes.button}
              >
                {type === `filter` ? `Apply` : `Save`}
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                id="employee-reset-button"
                disabled={isSubmitting }
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
              {type === `filter` && 
            <Button
              onClick={() => {                
                resetForm(initialValues);
                this.props.clearFilter();
              }}
              id="employee-reset-button" // TODO: better ids here
              disabled={isSubmitting }
              color="secondary"
              variant="text"
              className={classes.button}
            >
            Clear
            </Button>}
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
  crews: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeEmployee: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  clearFilter: PropTypes.func
};

export default withStyles(styles)(Employee);
