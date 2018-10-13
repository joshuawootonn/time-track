import React from 'react';
import PropTypes from 'prop-types';

import { Switch as MUSwitch, FormControlLabel } from '@material-ui/core';

const Switch = ({ field, className, label }) => (
  <FormControlLabel
    className={className}
    control={
      <MUSwitch
        checked={field.value}
        {...field}
      />
    }
    label={label}
  />
);

Switch.propTypes = {
  field: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Switch;