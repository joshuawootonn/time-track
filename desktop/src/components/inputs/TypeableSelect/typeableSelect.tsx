import { FieldProps } from 'formik';
import React from 'react';
import Select from 'react-select';
import {
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';

import { getIn } from 'formik';
import { Autocomplete } from "material-ui-formik-components/Autocomplete";



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
    margin = 'normal',
    fullWidth = false,
    items,
    children,
    formControlProps,
    labelProps,
    selectProps,
    itemProps,
    helper = 'normal',
    className,
    classes
  } = props;

  const transformItemsToOptions = (items: any[]): any[] => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.map(item => {
      if (item.name) {
        return { label: item.name, value: item.name };
      }
      if (item.type) {
        return { label: item.type, value: item.type };
      }
      if (
        item.firstName ||
        (item.firstName === '' && item.lastName) ||
        item.lastName === ''
      ) {
        return {
          label: item.firstName + ` ` + item.lastName,
          value: item.firstName + ` ` + item.lastName
        };
      }
    });
  };
  const options = transformItemsToOptions(items);

  console.log(items, options);

  return (
    <Autocomplete field={field as any} form={form} options={options} />
  );
};

export default SelectField;
