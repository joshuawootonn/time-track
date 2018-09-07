import React from 'react';
import PropTypes from 'prop-types';

import { TextField as MUTextField } from '@material-ui/core';

const TextField = ({ field, form, id, label, className, type, margin }) => (
  <MUTextField
    {...field}
    id={id}
    label={label}
    type={type}
    InputLabelProps={{ shrink: true }}
    fullWidth
    className={className}
    margin={margin}
    FormHelperTextProps={{ error: true }}
    helperText={form && form.errors[field.name] && form.touched[field.name]
      ? form.errors[field.name]
      : ' '
    }
  />
);



TextField.defaultProps = {
  type: 'search',
  margin: 'normal'
}

TextField.propTypes = {
  type: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string
};

export default TextField;
