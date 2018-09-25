import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import { minutes, hours } from 'constants/times';
import Select from 'components/inputs/Select';
import styles from './styles';

export class Time extends Component {
  render() {
    const { value, name } = this.props.field;
    const { classes, orientation, field, form,margin,fullWidth } = this.props;

    const minutesValue = Math.floor(value % 60);
    const hoursValue = Math.floor(value / 60) * 60;

    const wrapperClasses = cx({
      [classes.fieldWrapper]: true,
      [classes.horizontal]: orientation === 'Horizontal',
      [classes.vertical]: orientation === 'Vertical'
    });

    console.log(value, minutesValue, hoursValue);
    return (
      <div className={wrapperClasses}>
        <Select
          field={field}
          form={form}          
          margin={margin}
          fullWidth={fullWidth}
          label="Hours"
          selectProps={{
            onChange: e => {
              console.log(e.target.value, hoursValue);
              this.props.form.setFieldValue(
                name,
                value + e.target.value - hoursValue,
              );
            },
            value: hoursValue
          }}
          value={hoursValue}
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
          margin={margin}
          fullWidth={fullWidth}
          label="Minutes"
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
    );
  }
}
Time.defaultProps = {
  orientation: 'Horizontal',
  margin: 'normal',
  fullWidth: false
};

Time.propTypes = {
  margin: PropTypes.oneOf(['normal', 'dense', 'none']),
  fullWidth: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  orientation: PropTypes.oneOf(['Horizontal', 'Vertical']),
  className: PropTypes.object
};

export default withStyles(styles)(Time);


