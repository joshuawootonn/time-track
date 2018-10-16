import React from 'react';
import PropTypes from 'prop-types';

import { Switch as MUSwitch, FormControlLabel } from '@material-ui/core';

const Switch = ({ field, className, label,disabled }) => {
  //console.log(field)
  return <FormControlLabel
    className={className}
    control={
      <MUSwitch        
        {...field}
        disabled={disabled}
        checked={field.value}
        value="asdf"
        //value={typeof field.value === Boolean && field.value.toString()}
      />
    }
    label={label}
  />;
};

Switch.propTypes = {
  field: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Switch;