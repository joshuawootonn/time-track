import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Button, Typography, Input } from '@material-ui/core'
import { Field, Form } from 'formik';

import styles from './styles'

import Select from 'components/inputs/Select'
import TextField from 'components/inputs/TextField'
import File from 'components/inputs/File'

import * as exportConstants from 'constants/export'

class ExportForm extends Component {
  render() {
    const { classes, cancel } = this.props;
    return (
      <div className={classes.hero}>
        <Form className={classes.heroContent} >
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="display2">Export</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="exportCategory"
                render={({ field, form }) => {
                  console.log(form.values, form.errors)
                  return (
                    <Select
                      label="Export By"
                      formControlProps={{
                        fullWidth: true
                      }}
                      margin="none"
                      selectProps={{
                        autoWidth: true,
                        ...field,
                        className: classes.formElement,
                        input: (
                          <Input
                            name="exportCategory"
                          />
                        ),
                      }}
                      items={exportConstants.exportCategory}
                    />                      
                  )
                }}
              />

            </Grid>
            <Grid item xs={12}>
              <Field
                name='startTime'
                component={TextField}
                margin="none"
                label="From"
                type="date"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                name="timeLength"
                render={({ field }) => {
                  return (
                    <Select
                      label="Type"
                      formControlProps={{
                        fullWidth: true
                      }}
                      selectProps={{
                        ...field,
                        input: (
                          <Input
                            name="timeLength"
                          />
                        ),
                      }}
                      margin="none"
                      items={exportConstants.timeLength}
                    />                      
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="timeLengthType"
                render={({ field }) => {
                  return (
                    <Select
                      label="Length"
                      formControlProps={{
                        fullWidth: true
                      }}
                      selectProps={{
                        autoWidth: true,
                        ...field,
                        className: classes.formElement,
                        input: (
                          <Input
                            name="timeLengthType"
                          />
                        ),
                      }}
                      margin="none"
                      items={exportConstants.timeLengthType}
                    />
                  )
                }}
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
                  //  disabled={isSubmitting} 
                  variant="contained"
                  className={classes.button}
                >
                  export
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
    )
  }
}

export default withStyles(styles)(ExportForm)