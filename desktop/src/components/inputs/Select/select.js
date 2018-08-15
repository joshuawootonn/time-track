import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Select as SelectInput, MenuItem } from '@material-ui/core';

const Select = (props) => {

  console.log(props);

  return <SelectInput
    value={props.field.value}
    onChange={props.field.onChange(props.field.value)}
    MenuProps={{
      getContentAnchorEl: null,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    }}
    {...props.selectProps}
  >
    {props.children}
  </SelectInput>
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