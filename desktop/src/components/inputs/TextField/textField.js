import React from 'react';
import PropTypes from 'prop-types';

import { TextField as MUTextField } from '@material-ui/core';
import { getIn } from 'formik';

export const TextField = ({ field, form, label, className, type, margin, helper, onFocus, onBlur }) => (
  <MUTextField
    {...field}
    label={label}
    type={type}
    InputLabelProps={{ shrink: true }}
    fullWidth
    className={className}
    margin={margin}
    FormHelperTextProps={helper ===`none` ? { style:{ display:`none` },error: true } : { error: true  }} 
    helperText={getIn(form.touched, field.name) ? getIn(form.errors, field.name) : ` `}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

TextField.defaultProps = {
  type: `search`,
  margin: `normal`,
  helper: `normal`
};

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string,
  helper: PropTypes.oneOf([`none`,`normal`]),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextField;
