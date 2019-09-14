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
import { Autocomplete } from 'material-ui-formik-components/Autocomplete';
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


const styles = () => ({
  aaa: {
    backgroundColor: '#eee',
    height: '100%'
    // '> div': {
    //   height: '100%',
    //   '> div': {
    //     height: '100%',
    //     '> div': {
    //       height: '100%',
    //       '> div': {
    //         height: '100%',
    //         '> div': {
    //           height: '100%',
    //           padding: '16px 0 7px 0'
    //         }
    //       }
    //     }
    //   },
  },
  fieldWrapper: {
    display: `flex`,
    flexDirection: `column`,
    width: `100%`
  },
  vertical: {
    flexDirection: `column`
  },
  horizontal: {
    flexDirection: `row`
  }
  // helper: {
  //   marginTop: '0px'
  // }
});



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

  const options = transformItemsToOptions(items);

  console.log(items, options);

  return (
    <FormControl
      {...formControlProps}
      margin="none"
      fullWidth={fullWidth}
      className={cx(classes.fieldWrapper, classes.vertical)}
    >
      {label && <InputLabel shrink={true} {...labelProps}>{label}</InputLabel>}
      <Autocomplete
        fullWidth={fullWidth}
        field={field as any}
        form={form}
        options={options}
      />  
      <FormHelperText error={true}>
        {getIn(form.touched, field.name) ? getIn(form.errors, field.name) : ` `}
      </FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles as any)(SelectField);
