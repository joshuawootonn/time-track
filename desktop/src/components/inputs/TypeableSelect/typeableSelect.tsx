import { FieldProps } from 'formik';
import React from 'react';
import Select from 'react-select';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  withStyles
} from '@material-ui/core';

import cx from 'classnames';

import { getIn } from 'formik';
import  Autocomplete  from './autoCompleteBase';
import { transformItemsToOptions } from 'helpers/input.helper';

type Item =
  | { name: string }
  | { type: string }
  | { firstName: string; lastName: string };

type OptionType = {
  value: string;
  label: string;
};

interface Props {
  items: Item[];
  label: string;
  margin: 'normal' | 'dense' | 'none';
  fullWidth: boolean;
  helper: 'normal' | 'none';
  formControlProps: any;
  labelProps: any;
  itemProps: any;
  className: string;
  selectProps: any;
  classes: any;
}


export const SelectField: React.SFC<Props & FieldProps> = props => {
  const {
    field,
    form,
    label,
    fullWidth = false,
    items,
    formControlProps,
    className,
  } = props;

  const options = transformItemsToOptions(items);

  console.log(items, options);

  return (
    <FormControl
      {...formControlProps}
      margin="none"
      fullWidth={fullWidth}
      className={className}
    >      
      <Autocomplete
        fullWidth={fullWidth}
        label={label}
        field={field as any}
        form={form}
        options={options}
      />  
    </FormControl>
  );
};

export default SelectField;
