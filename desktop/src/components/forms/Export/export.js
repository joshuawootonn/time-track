import React, { Component } from 'react';

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
    const { classes, cancel, isSubmitting } = this.props;
    return (
      <div className={classes.hero}>
        <Form className={classes.heroContent}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="display2">Export</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="exportCategory"
                component={Select}
                items={exportConstants.exportCategory}
                fullWidth
                label="Export By"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="startTime"
                component={TextField}
                margin="none"
                label="From"
                type="date"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="timeLength"
                component={Select}
                items={exportConstants.timeLength}
                fullWidth
                label="Type"
                margin="none"
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="timeLengthType"
                component={Select}
                items={exportConstants.timeLengthType}
                fullWidth
                label="Length"
                margin="none"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="fileLocation"
                component={File}
                label="File"
                type="file"
              />
            </Grid>
            <Grid item xs={12} className={classes.formFooter}>
              <div>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.button}
                >
                  Export
                </Button>

                <Button
                  onClick={cancel}
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
      </div>
    );
  }
}

export default withStyles(styles)(ExportForm);
