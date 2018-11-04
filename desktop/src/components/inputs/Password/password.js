import React from 'react';
import PropTypes from 'prop-types';

import { TextField as MUTextField } from '@material-ui/core';
import { getIn } from 'formik';

const TextField = ({ field, form, id, label, helper,margin }) => (
  <MUTextField
    {...field}    
    id={id}
    label={label}
    type="password"
    InputLabelProps={{ shrink: true }}
    fullWidth
    margin={margin}
    FormHelperTextProps={helper ==='none' ? { style:{ display:'none' },error: true } : { error: true  }}
    helperText={getIn(form.errors, field.name)|| ' '} 
  />
);

TextField.defaultProps = {  
  helper: 'normal',
  margin: 'normal'
};

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  helper: PropTypes.oneOf(['none','normal'])
};

export default TextField;
