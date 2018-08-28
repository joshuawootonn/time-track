import React from 'react';

import PropTypes from 'prop-types';
import {
  Select as SelectInput,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

const Select = props => {
  const {
    formControlProps,
    label,
    labelProps,
    selectProps
  } = props;
  return (
    <FormControl {...formControlProps}  margin="normal">
      {label !== undefined ? (
        <InputLabel {...labelProps} >{label}</InputLabel>
      ) : null}
      <SelectInput
        
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
        {...selectProps}
      >
        {props.children}
      </SelectInput>
    </FormControl>
  );
};

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func, 
};

export default Select;
