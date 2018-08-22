import React from 'react';

import PropTypes from 'prop-types';
import { Select as SelectInput, FormControl, InputLabel,FormHelperText } from '@material-ui/core';

const Select = (props) => {

  console.log(props);
  const {formControlProps,label,LabelProps,selectProps,helperText,FormHelperTextProps} = props;
  return(
  <FormControl
    {...formControlProps}
    margin="normal"
  >
    {label !== undefined ? (
      <InputLabel
        {...LabelProps}
      >
        {label}
      </InputLabel>
    ) : null}
    <SelectInput
      margin="normal"
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
    
  </FormControl>)
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default Select;