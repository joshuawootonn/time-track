import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Button, InputLabel, FormControl, Input } from '@material-ui/core'

import styles from './styles'

class File extends Component {
  fileChange = (e) => {
    console.log(e, e.target.value)
  }
  render() {
    const { label, labelProps, formControlProps, margin, classes } = this.props;
    return (
      <FormControl {...formControlProps} fullWidth margin={margin}>
        <div className={classes.row}>
          {label !== undefined ? (
            <InputLabel {...labelProps} >{label}</InputLabel>
          ) : null}
          <Input
            fullWidth
          />
          <input
            accept="image/*"
            id="contained-button-file"
            className={classes.inputToHide}
            multiple
            type="file"
            onChange={this.fileChange}
          />
          <label htmlFor="contained-button-file" className={classes.center}>
            <Button variant="contained" color="primary" component="span" className={classes.button} >
              Select File
          </Button>
          </label>
        </div >
      </FormControl>
    )
  }
}

export default withStyles(styles)(File)