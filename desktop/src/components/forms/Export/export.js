import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Grid, MenuItem } from '@material-ui/core'

import styles from './styles'

import Select from 'components/inputs/Select'


const exportTypes = [{ id: 0, name: "Employeee" }, { id: 2, name: "Project" }, { id: 3, name: "Task" }, { id: 4, name: "Crew" }]


class ExportForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent} >
          <Grid container spacing={12}>
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
              <Select
                label="From"
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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

          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ExportForm)