import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Button } from '@material-ui/core'

import styles from './styles'

import Select from 'components/inputs/Select'
import TextField from 'components/inputs/TextField'


const exportTypes = [{ id: 0, name: "Employeee" }, { id: 2, name: "Project" }, { id: 3, name: "Task" }, { id: 4, name: "Crew" }]
const times = [{ id: 0, name: "1" }, { id: 1, name: "2" }, { id: 2, name: "3" },
{ id: 3, name: "4" }, { id: 4, name: "5" }, { id: 5, name: "6" },
{ id: 6, name: "7" }, { id: 7, name: "8" }, { id: 8, name: "9" },
{ id: 9, name: "10" }, { id: 10, name: "11" }, { id: 11, name: "12" },]
const durations = [{id: 0, name: "day(s)"},{id: 1, name: "week(s)"}, {id: 2, name: "month(s)"},{id:3, name: "year(s)"}]

class ExportForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent} >
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Select
                label="Export By"
                formControlProps={{
                  fullWidth: true
                }}
                margin="none"
              >
                {
                  exportTypes.map((exportType, i) => {
                    return (
                      <MenuItem
                        key={i}
                        id="id"
                        value={exportType.name}
                      >
                        {exportType.name}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="from"
                label="From"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="none"
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                label="For"
                formControlProps={{
                  fullWidth: true
                }}
                margin="none"
              >
                {
                  times.map((time, i) => {
                    return (
                      <MenuItem
                        key={i}
                        id="id"
                        value={time.name}
                      >
                        {time.name}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Length"
                formControlProps={{
                  fullWidth: true
                }}
                margin="none"
              >
                {
                  durations.map((duration, i) => {
                    return (
                      <MenuItem
                        key={i}
                        id="id"
                        value={duration.name}
                      >
                        {duration.name}
                      </MenuItem>
                    )
                  })
                }
              </Select>
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
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ExportForm)