import { FieldProps } from 'formik';
import React from 'react';
import { FormControl} from '@material-ui/core';

import  Autocomplete  from './autoCompleteBase';

type Item =
  | { name: string }
  | { type: string }
  | { firstName: string; lastName: string };

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
        options={items}
      />  
    </FormControl>
  );
};

export default SelectField;
