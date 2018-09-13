import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, InputLabel, FormControl, Input } from '@material-ui/core';

import styles from './styles';

class File extends Component {
  fileChange = e => {
    const { form, field } = this.props;
    form.setFieldValue(field.name, e.target.files[0].path);
  };
  render() {
    const {
      label,
      labelProps,
      formControlProps,
      margin,
      classes,
      field,
    } = this.props;
    //console.log(this.props)
    return (
      <FormControl {...formControlProps} fullWidth margin={margin}>
        <div className={classes.row}>
          {label !== undefined ? (
            <InputLabel {...labelProps}>{label}</InputLabel>
          ) : null}
          <Input fullWidth {...field} />
          <input
            accept=".xlsx, .xls"
            id="contained-button-file"
            className={classes.inputToHide}
            type="file"
            onChange={this.fileChange}
          />
          <label
            htmlFor="contained-button-file"
            className={classes.buttonAlign}
          >
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.button}
            >
              Select File
            </Button>
          </label>
        </div>
      </FormControl>
    );
  }
}

export default withStyles(styles)(File);
