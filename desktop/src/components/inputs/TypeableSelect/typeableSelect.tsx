import { FieldProps } from 'formik';
import React, { HTMLAttributes } from 'react';
import Select from 'react-select';
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Paper,
  Typography,
  Chip,
  TextField
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'classnames';
import CancelIcon from '@material-ui/icons/Cancel';
import { getIn } from 'formik';

import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { BaseTextFieldProps } from '@material-ui/core/TextField';


import styles from './styles';

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
        classes={classes}
        value={
          options
            ? options.find((option: OptionType) => option.value === field.value)
            : ''
        }
        components={components}
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

export default withStyles(styles as any)(SelectField);

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> &
  HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType>) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props: OptionProps<OptionType>) {
  return (
    //@ts-ignore
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> &
  Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>;
function Placeholder(props: MuiPlaceholderProps) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props: MultiValueProps<OptionType>) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip)}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};


