import { FieldProps } from 'formik';
import React from 'react';
import Select from 'react-select';
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText
} from '@material-ui/core';
import { getIn } from 'formik';
// import { Option } from 'react-select/src/filters';

type Item =
  | { name: string }
  | { type: string }
  | { firstName: string; lastName: string };

type Option = {
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
    className
  } = props;

  const transformItemsToOptions = (items: Item[]): any[] => {
    if (!items || items.length === 0) {
      return [];
    }
    return items.map(item => {
      //@ts-ignore
      if (item.name) {
        //@ts-ignore
        return { label: item.name, value: item.name };
      }
      //@ts-ignore
      if (item.type) {
        //@ts-ignore
        return { label: item.type, value: item.type };
      }
      //@ts-ignore
      if (
        item.firstName ||
        (item.firstName === '' && item.lastName) ||
        item.lastName === ''
      ) {
        //@ts-ignore
        return {
          label: item.firstName + ` ` + item.lastName,
          value: item.firstName + ` ` + item.lastName
        };
      }
    });
  };
  const options = transformItemsToOptions(items);

  // {item.name ||
  //   item.type ||
  //   item.firstName + ` ` + item.lastName}

  console.log(items, options);

  return (
    <FormControl
      className={className}
      {...formControlProps}
      margin={margin}
      fullWidth={fullWidth}
    >
      {label && <InputLabel {...labelProps}>{label}</InputLabel>}
      <Select
        options={options}
        name={field.name}
        value={
          options
            ? options.find((option: Option) => option.value === field.value)
            : ''
        }
        onChange={(option: any) => form.setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
      />
      {helper === `normal` && (
        <FormHelperText error={true}>
          {getIn(form.touched, field.name)
            ? getIn(form.errors, field.name)
            : ` `}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectField;
