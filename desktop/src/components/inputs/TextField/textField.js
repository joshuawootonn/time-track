import React from 'react';
import PropTypes from 'prop-types';

import { TextField as MUTextField } from '@material-ui/core';

const TextField = ({ field, form, id, label,className }) => (
  <MUTextField
    {...field}
    id={id}
    label={label}
    type="search"
    InputLabelProps={{ shrink: true }}
    fullWidth
    className={className}
    margin="normal"
    FormHelperTextProps={{ error: true }}
    helperText={
      form.errors[field.name] && form.touched[field.name]
        ? form.errors[field.name]
        : ' '
    }
  />
);

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default TextField;
