import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { Field, Form } from 'formik';

import styles from './styles';

import TextField from 'components/inputs/TextField';
import File from 'components/inputs/File';
import Select from 'components/inputs/Select';

import * as exportConstants from 'constants/export';

class ExportForm extends Component {
  render() {
    const { classes, cancel, isSubmitting, errors,values } = this.props;    
  
    return (
      <div className={classes.hero}>
        <Form className={classes.heroContent}>
          <Grid container spacing={24}>
            <Grid item xs={12} className={classes.title}>
              <Typography variant="h3">Export</Typography>
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <Field
                name="exportCategory"
                component={Select}
                items={exportConstants.exportCategory}
                fullWidth
                margin="none"
                label="Export By"
                helper="normal"
              />
              <Field
                name="start"
                component={TextField}              
                margin="none"
                label="From"
                type="date"
                helper="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="fileLocation"
                component={File}
                label="File"
                fullWidth
                margin="none"
                type="file"
              />
            </Grid>
            <Grid item xs={12} className={classes.row}>
              <Typography variant="body1" className={classes.error}>{errors[Object.keys(errors)[0]]}</Typography>
              <div>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || Object.keys(errors).length !== 0 || values.fileLocation.length === 0 }
                  variant="contained"
                >
                  Export
                </Button>
                <Button
                  onClick={cancel}
                  color="secondary"
                  variant="text"
                  className={classes.spaceAround}
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    );
  }
}

ExportForm.propTypes = {
  values: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  cancel: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object
};
export default withStyles(styles)(ExportForm);
