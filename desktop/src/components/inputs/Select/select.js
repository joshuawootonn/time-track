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
    selectProps,
    margin
  } = props;


  return (
    <FormControl {...formControlProps}  margin={margin}>
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

Select.defaultProps = {
  margin: 'normal'
}

Select.propTypes = {
  margin: PropTypes.oneOf(['normal','dense','none']),
  value: PropTypes.string,
  onChange: PropTypes.func, 
};

export default Select;
