import React from 'react';
import P from 'prop-types';
import ReactSelect, {
  Creatable as ReactSelectCreatable,
  Async as ReactSelectAsync,
  AsyncCreatable as ReactSelectAsyncCreatable
} from 'react-select';
import get from 'lodash/get';
import { Field } from 'formik';
import { withStyles } from 'material-ui';
import { getContext, toClass } from 'recompose';
import Input from 'material-ui/Input';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import ClearIcon from 'react-icons/lib/md/clear';
import ArrowDropDownIcon from 'react-icons/lib/md/arrow-drop-down';
import ArrowDropUpIcon from 'react-icons/lib/md/arrow-drop-up';

const log = require('debug')('app:components:SelectField');

/**
 * @todo: but why are we doing all of this at all?
 *        maybe this could help lessen the amount of code:
 *        https://material-ui-next.com/demos/selects/
 */

/*
FormControl passes its own context:
https://github.com/mui-org/material-ui/blob/v1-beta/src/Form/FormControl.js
const { disabled, error, required, margin } = this.props;
const { adornedStart, dirty, focused } = this.state;
return {
   muiFormControl: {
     adornedStart,
     dirty,
     disabled,
     error,
     focused,
     margin,
     required,
     onDirty: this.handleDirty,
     onClean: this.handleClean,
     onFocus: this.handleFocus,
     onBlur: this.handleBlur,
   },
 };
*/

/**
 * @todo UPDATE DOCS
 * Select component. Wraps react-select into material-ui theme
 * all other props will be spread on Input
 * to pass options to react-select use prop.reactSelectProps
 *
 * props.creatable - to turn it into react-select creatable
 * props.loadOptions will turn it into react-select async
 */

const constructValidValue = (value, valueKey, customChange) => {
  if (customChange) {
    return value;
  }

  if (!value) {
    return;
  }
  if (typeof value === 'object' && !value.length) {
    return value[valueKey];
  }
  return value.toString();
};

export const SelectField = props => {
  const {
    clearable,
    creatable,
    disabled,
    fullWidth,
    label,
    name,
    classes,
    options,
    reactSelectProps,
    required,
    placeholder = '',
    multi,
    valueKey,
    customChange,
    ...rest
  } = props;

  log(props);

  return (
    <Field
      name={name}
      render={({ field, form }) => {
        log('in field', field, form);

        const error = form.errors ? get(form.errors, field.name) : null;
        // const touched = form.touched ? get(form.touched, field.name) : false;

        const labelText = error || label;

        return (
          <FormControl
            disabled={disabled}
            fullWidth={fullWidth}
            error={Boolean(error)}
            required={required}
            onBlur={() => form.setFieldTouched(name, true)}
          >
            {labelText && <InputLabel htmlFor={name}>{labelText}</InputLabel>}
            <InputComponent
              clearable={clearable}
              creatable={creatable}
              classes={classes}
              id={name}
              multi={multi}
              onChange={option => {
                let value = multi ? [] : '';

                if (option) {
                  value = multi
                    ? option.map(o => o[valueKey])
                    : option[valueKey];
                }

                // fixme: something is wrong here
                if (customChange) {
                  value = customChange(option) || '';
                }

                form.setFieldValue(name, value);
              }}
              options={options}
              placeholder={error ? '' : placeholder}
              reactSelectProps={reactSelectProps}
              value={constructValidValue(field.value, valueKey, customChange)}
              valueKey={valueKey}
              {...rest}
            />
          </FormControl>
        );
      }}
    />
  );
};

/**
 * Select component option proptype
 */
export const selectOptionProptype = P.shape({
  clearable: true,
  label: P.string.isRequired,
  value: P.any.isRequired
});

SelectField.propTypes = {
  /**
   * material-ui classes
   */
  classes: P.object.isRequired,
  /**
   * Should clear icon be shown?
   */
  clearable: P.bool,
  /**
   * can user create extra items?
   */
  creatable: P.bool,
  /**
   * Is field disabled?
   */
  disabled: P.bool,
  /**
   * Should select field occuply maximum container width?
   */
  fullWidth: P.bool,
  /**
   * input label
   */
  label: P.string,
  /**
   * multi select?
   */
  multi: P.bool,
  /**
   * field name within a formik form
   */
  name: P.string.isRequired,
  /**
   * list of options
   */
  options: P.arrayOf(selectOptionProptype),
  /**
   * Placeholder
   */
  placeholder: P.string,
  /**
   * this will be passed directly to react select
   * you have been warned
   */
  reactSelectProps: P.object,
  /**
   * Is this field required?
   */
  required: P.bool,
  /**
   * value key in options (similar to react-select)
   */
  valueKey: P.string.isRequired,
  /**
   * if we need our callback
   */
  customChange: P.func
};

SelectField.defaultProps = {
  fullWidth: true,
  valueKey: 'value',
  options: []
};

const InputComponent = getContext({ muiFormControl: P.object })(props => {
  const {
    clearable,
    creatable,
    classes,
    placeholder,
    multi,
    muiFormControl,
    valueKey,
    value,
    options,
    onChange,
    reactSelectProps,
    ...rest
  } = props;

  return (
    <Input
      id={props.id}
      // error={form.errors && form.errors[field.name]}
      inputComponent={SelectWrapped}
      inputProps={{
        clearable,
        creatable,
        classes,
        focused: muiFormControl.focused,
        placeholder,
        onChange: value => {
          // this condition helps to keep Label in the right position and state
          if (value) {
            muiFormControl.onDirty && muiFormControl.onDirty();
          } else {
            muiFormControl.onClean && muiFormControl.onClean();
          }

          onChange && onChange(value);
        },
        value,
        options,
        multi,
        valueKey,
        ...reactSelectProps
      }}
      value={value}
      {...rest}
    />
  );
});

InputComponent.propTypes = {
  clearable: P.bool,
  creatable: P.bool,
  classes: P.any,
  id: P.string,
  options: P.array,
  placeholder: P.string,
  reactSelectProps: P.any,
  onChange: P.func,
  multi: P.bool,
  value: P.string,
  valueKey: P.string
};

const SelectWrapped = props => {
  log('SelectWrapped', props);

  const { creatable, classes, focused, onChange, ...rest } = props;

  let Component;

  if (props.loadOptions) {
    Component = creatable ? ReactSelectAsyncCreatable : ReactSelectAsync;
  } else {
    Component = creatable ? ReactSelectCreatable : ReactSelect;
  }

  return (
    <Component
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        // fixme: at the moment mui/Input element intercepts the original
        // onFocus element. So if SelectField is blurred and we click on a Delete icon
        // on any of the items, then it does not delete it, but only focuses the element
        // this hack here removes the delete icon when SelectField is blurred
        const onDelete = focused ? () => onRemove(value) : undefined;

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      onChange={onChange}
      {...rest}
    />
  );
};

SelectWrapped.propTypes = {
  creatable: P.bool,
  classes: P.object.isRequired,
  focused: P.bool,
  onChange: P.func,
  loadOptions: P.func
};

const Option = toClass(props => {
  log('Option', props);

  const { children, isFocused, isSelected, onFocus, onSelect, option } = props;

  return (
    <MenuItem
      onFocus={onFocus}
      selected={isFocused}
      onClick={() => onSelect(option)}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {children}
    </MenuItem>
  );
});

Option.propTypes = {
  children: P.node,
  isFocused: P.bool,
  isSelected: P.bool,
  onFocus: P.func,
  onSelect: P.func.isRequired,
  option: P.any
};

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 200,
    width: 200
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none'
      }
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap'
    },
    '.Select--multi .Select-input': {
      margin: 0
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto'
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: '0 0 0 0.5rem',
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 20,
      maxHeight: ITEM_HEIGHT * 4.5
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none'
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto'
    },
    '.Select-menu div': {
      boxSizing: 'content-box'
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1
    }
  }
});

export default withStyles(styles)(SelectField);
