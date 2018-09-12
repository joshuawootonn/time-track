import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Button, Typography, Input } from '@material-ui/core'
import { Field, Form } from 'formik';

import styles from './styles'

import Select from 'components/inputs/Select'
import TextField from 'components/inputs/TextField'
import File from 'components/inputs/File'


const exportTypes = [{ id: 0, name: "Employeee" }, { id: 2, name: "Project" }, { id: 3, name: "Task" }, { id: 4, name: "Crew" }]
const times = [{ id: 0, name: "1" }, { id: 1, name: "2" }, { id: 2, name: "3" },
{ id: 3, name: "4" }, { id: 4, name: "5" }, { id: 5, name: "6" },
{ id: 6, name: "7" }, { id: 7, name: "8" }, { id: 8, name: "9" },
{ id: 9, name: "10" }, { id: 10, name: "11" }, { id: 11, name: "12" },]
const durations = [{ id: 0, name: "day(s)" }, { id: 1, name: "week(s)" }, { id: 2, name: "month(s)" }, { id: 3, name: "year(s)" }]

class ExportForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.hero}>
        <Form className={classes.heroContent} >
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="display2">Export</Typography>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="exportBy"
                render={({ field, form }) => {
                  console.log(form.values)
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
                            name="exportBy"
                          />
                        ),
                      }}
                    >
                      {
                        exportTypes.map((exportType, i) => {
                          return (
                            <MenuItem
                              key={i}
                              id="id"
                              value={exportType.id}
                            >
                              {exportType.name}
                            </MenuItem>
                          )
                        })
                      }
                    </Select>
                  )
                }}
              />

            </Grid>
            <Grid item xs={12}>
              <Field
                name='from'
                component={TextField}
                margin="none"
                label="From"
                type="date"
              />
            </Grid>

            <Grid item xs={6}>
              <Field
                name="type"
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
                            name="type"
                          />
                        ),
                      }}
                      margin="none"
                    >
                      {
                        times.map((time, i) => {
                          return (
                            <MenuItem
                              key={i}
                              id="id"
                              value={time.id}
                            >
                              {time.name}
                            </MenuItem>
                          )
                        })
                      }
                    </Select>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="length"
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
                            name="length"
                          />
                        ),
                      }}
                      margin="none"
                    >
                      {
                        durations.map((duration, i) => {
                          return (
                            <MenuItem
                              key={i}
                              id="id"
                              value={duration.id}
                            >
                              {duration.name}
                            </MenuItem>
                          )
                        })
                      }
                    </Select>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="file"
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
                  //  onClick={cancel}
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