import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Select as SelectInput, FormControl, InputLabel, MenuItem, FormHelperText } from '@material-ui/core';
import { getIn } from 'formik';

export class Select extends Component { 
  onChange = e => {
    const { field,onChange } = this.props;
    field.onChange(e);
    onChange && onChange(e);
  }
  // Fix for handleblur I was getting on deselect
  // https://github.com/jaredpalmer/formik/issues/640
  onBlur = e => {
    const { field, form } = this.props;
    e.target.name = field.name;
    form.handleBlur(e);
  }
  render() {
    const { field, form, label, margin,
      fullWidth, items, children, formControlProps,
      labelProps, selectProps, itemProps,helper,className } = this.props;
    return (
      <FormControl className={className} {...formControlProps} margin={margin} fullWidth={fullWidth}>
        {label && <InputLabel {...labelProps}>{label}</InputLabel>}
        <SelectInput
          {...field}
          onChange={this.onChange} 
          {...selectProps}
          onBlur={this.onBlur}               
          fullWidth={fullWidth}
        >
          {items &&
              items.map((item, i) => {
                return (
                  <MenuItem {...itemProps} key={i} id={item.id} value={item.id}>
                    {item.name || item.type || item.firstName + ' ' + item.lastName}
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
  }  
}

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
  onchange: PropTypes.func
};

export default Select;
