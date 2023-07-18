import React from 'react';
import PropTypes from 'prop-types';

import { TextField as MUTextField } from '@material-ui/core';
import { getIn } from 'formik';

export const Password = ({ field, form, id, label, helper, margin }) => (
  <MUTextField
    {...field}
    id={id}
    label={label}
    type="password"
    InputLabelProps={{ shrink: true }}
    fullWidth
    margin={margin}
    FormHelperTextProps={
      helper === `none`
        ? { style: { display: `none` }, error: true }
        : { error: true }
    }
    helperText={
      getIn(form.touched, field.name) ? getIn(form.errors, field.name) : ` `
    }
  />
);

Password.defaultProps = {
  helper: `normal`,
  margin: `normal`
};

Password.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  helper: PropTypes.oneOf([`none`, `normal`])
};

export default Password;
