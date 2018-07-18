import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { TextField as MUTextField } from '@material-ui/core';

import style from './style';

const TextField = ({ field, form, id, label, type }) => (
  <MUTextField
    {...field}
    id={id}
    label={label}
    type={type ? type : 'search'}
    InputLabelProps={{ shrink: true }}
    fullWidth
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
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(style)(TextField);
