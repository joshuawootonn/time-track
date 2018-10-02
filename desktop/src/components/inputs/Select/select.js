import React from 'react';
import PropTypes from 'prop-types';

import { Select as SelectInput, FormControl, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import { getIn } from 'formik'

const Select = ({ field, form, label, margin,
  fullWidth, items, children, formControlProps,
  labelProps, selectProps, itemProps,helper }) => {
  return (
    <FormControl {...formControlProps} margin={margin} fullWidth={fullWidth}>
      {label && <InputLabel {...labelProps}>{label}</InputLabel>}
      <SelectInput
        {...field}
        {...selectProps}
        // Fix for handleblur I was getting on deselect
        // https://github.com/jaredpalmer/formik/issues/640
        onBlur={event => {
          console.log(event.target, field);
          event.target.name = field.name;
          form.handleBlur(event);
        }}
        fullWidth={fullWidth}
      >
        {items &&
          items.map((item, i) => {
            return (
              <MenuItem {...itemProps} key={i} id={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        {children}
      </SelectInput>
      {helper === 'normal' && <FormHelperText error={true}>
        {getIn(form.errors, field.name)}
      </FormHelperText>}
    </FormControl>
  );
};

Select.defaultProps = {
  margin: 'normal',
  fullWidth: false,
  helper: 'normal'
};

Select.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  margin: PropTypes.oneOf(['normal', 'dense', 'none']),
  fullWidth: PropTypes.bool,
  items: PropTypes.array,
  children: PropTypes.array,
  formControlProps: PropTypes.object,
  labelProps: PropTypes.object,
  selectProps: PropTypes.object,
  itemProps: PropTypes.object,
  helper: PropTypes.oneOf(['normal', 'none']),
};

export default Select;
