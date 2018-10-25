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


class Project extends Component {
  render() {
    const { classes,label, type,deleteProject,isSubmitting, resetForm, initialValues,errors } = this.props;
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow,classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {type === 'edit' && (
              <Tooltip title="Delete">
                <IconButton onClick={deleteProject} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12}  className={classes.row}>
            <Field
              name="name"
              component={TextField}
              margin="none"
              label="Task Name"
              type="search"
              className={classes.field}
              helper="normal"
            />           
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="date"
              component={TextField}              
              margin="none"
              label="Start Date"
              type="date"              
              className={classes.field}
              helper="normal"
            />    
            <Field
              name="isActive"
              component={Switch}
              label="Active"
              className={classes.field}
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
                disabled={isSubmitting}
                variant="contained"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
            </div>
          </Grid>      
        </Grid>
      </Form>
    );
  }
}

Project.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  deleteProject: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default withStyles(styles)(Project);