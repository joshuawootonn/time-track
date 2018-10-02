import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, InputLabel, FormControl, Input,FormHelperText } from '@material-ui/core';
import { getIn } from 'formik';

import styles from './styles';

class File extends Component {
  fileChange = e => {
    const { form, field } = this.props;
    form.setFieldValue(field.name, e.target.files[0].path);
  };
  render() {
    const { form, label, labelProps, formControlProps, margin, classes, field,helper,fullWidth } = this.props;
    return (
      <FormControl {...formControlProps} fullWidth={fullWidth} margin={margin}>
        <div className={classes.row}>
          {label !== undefined ? (
            <InputLabel shrink {...labelProps}>{label}</InputLabel>
          ) : null}
          <Input fullWidth={fullWidth} {...field} />
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
        {helper === 'normal' && <FormHelperText error={true}>
          {getIn(form.errors, field.name)}
        </FormHelperText>}
      </FormControl>
    );
  }
}

File.defaultProps = {
  margin: 'normal',
  fullWidth: false,
  helper: 'normal'
};

File.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  margin: PropTypes.oneOf(['normal', 'dense', 'none']),
  fullWidth: PropTypes.bool,
  helper: PropTypes.oneOf(['normal', 'none'])
};

export default withStyles(styles)(File);
