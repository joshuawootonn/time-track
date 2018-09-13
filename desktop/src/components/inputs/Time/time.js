import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { minutes, hours } from 'constants/times';
import Select from 'components/inputs/Select';
import styles from './styles';

export class Time extends Component {
  render() {
    const { value, name } = this.props.field;
    const { classes, orientation, className } = this.props;

    const minutesValue = Math.floor(value % 60);
    const hoursValue = Math.floor(value / 60) * 60;

    const wrapperClasses = cx({
      [classes.fieldWrapper]: true,
      [classes.horizontal]: orientation === 'Horizontal',
      [classes.vertical]: orientation === 'Vertical'
    });

    return (
      <div className={wrapperClasses}>
        <Select
          label="Hours"
          formControlProps={{
            className: className,
            fullWidth: true
          }}
          labelProps={{
            className: className
          }}
          selectProps={{
            className: className,
            autoWidth: true,
            onChange: e => {
              this.props.form.setFieldValue(
                name,
                value + e.target.value - hoursValue,
              );
            },
            value: hoursValue
          }}
        >
          {hours.map((time, i) => {
            return (
              <MenuItem key={i} id="length" value={time.value}>
                {time.label}
              </MenuItem>
            );
          })}
        </Select>
        <Select
          label="Minutes"
          formControlProps={{
            className: className,
            fullWidth: true
          }}
          labelProps={{
            className: className
          }}
          selectProps={{
            className: className,
            autoWidth: true,
            onChange: e => {
              this.props.form.setFieldValue(
                name,
                value + e.target.value - minutesValue,
              );
            },
            value: minutesValue
          }}
        >
          {minutes.map((time, i) => {
            return (
              <MenuItem key={i} id="length" value={time.value}>
                {time.label}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    );
  }
}
Time.defaultProps = {
  orientation: 'Horizontal'
};

Time.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  orientation: PropTypes.oneOf(['Horizontal', 'Vertical'])
};

export default withStyles(styles)(Time);
