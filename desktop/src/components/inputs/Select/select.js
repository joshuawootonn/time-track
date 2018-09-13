import React from 'react';
import PropTypes from 'prop-types';

import { Select as SelectInput, FormControl, InputLabel, MenuItem } from '@material-ui/core';

const Select = ({ field, form, label, margin,
  fullWidth, items, children, formControlProps,
  labelProps, selectProps, itemProps }) => {

  return (
    <FormControl {...formControlProps} margin={margin} fullWidth={fullWidth}>
      {label && <InputLabel {...labelProps}>{label}</InputLabel>}
      <SelectInput
        {...selectProps}
        {...field}
        // Fix for handleblur I was getting on deselect
        // https://github.com/jaredpalmer/formik/issues/640
        onBlur={event => {
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
    </FormControl>
  );
};

Select.defaultProps = {
  margin: 'normal',
  fullWidth: false
};

Select.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  margin: PropTypes.oneOf(['normal', 'dense', 'none']),
  fullWidth: PropTypes.bool,
  items: PropTypes.array,
  children: PropTypes.element,
  formControlProps: PropTypes.object,
  labelProps: PropTypes.object,
  selectProps: PropTypes.object,
  itemProps: PropTypes.object
};

export default Select;
