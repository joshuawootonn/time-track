import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem, FormHelperText, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import { getIn } from 'formik';

import { minutes, hours } from 'constants/times';
import Select from 'components/inputs/Select';
import styles from './styles';

export class Time extends Component {
  render() {
    const { value, name } = this.props.field;
    const { classes, field, form, margin, fullWidth, label1, label2, helper,className } = this.props;

    const minutesValue = Math.floor(value % 60);
    const hoursValue = Math.floor(value / 60) * 60;

    //console.log(value, minutesValue, hoursValue);
    return (
      <FormControl fullWidth={fullWidth}  className={cx(classes.fieldWrapper,classes.vertical)}>
        <div className={cx(classes.fieldWrapper,classes.horizontal)} >
          <Select
            field={field}
            form={form}
            className={className}
            margin={margin}
            fullWidth={fullWidth}
            label={label1}
            selectProps={{
              onChange: e => {
                //console.log(e.target.value, hoursValue);
                this.props.form.setFieldValue(
                  name,
                  value + e.target.value - hoursValue,
                );
              },
              value: hoursValue
            }}
            value={hoursValue}
            helper="none"
          >
            {hours.map((item, i) => {
              return (
                <MenuItem key={i} id={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            field={field}
            form={form}
            className={className}
            margin={margin}
            fullWidth={fullWidth}
            label={label2}
            selectProps={{
              onChange: e => {
                this.props.form.setFieldValue(
                  name,
                  value + e.target.value - minutesValue,
                );
              },
              value: minutesValue
            }}
            value={minutesValue}
            helper="none"
          >
            {minutes.map((item, i) => {
              return (
                <MenuItem key={i} id={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        {helper === 'normal' && <FormHelperText className={cx(classes.helper)} error={true}>
          {getIn(form.errors, field.name)}
        </FormHelperText>}
      </FormControl>
    );
  }
}
Time.defaultProps = {
  margin: 'normal',
  fullWidth: false,
  label1: 'Hours',
  label2: 'Minutes',
  helper: 'normal'
};

Time.propTypes = {
  margin: PropTypes.oneOf(['normal', 'dense', 'none']),
  fullWidth: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  helper: PropTypes.oneOf(['normal', 'none']),
  label1: PropTypes.string,
  label2: PropTypes.string
};

export default withStyles(styles)(Time);


