import React, { Component } from 'react'

import { MenuItem } from '@material-ui/core';

import { minutes, hours } from 'constants/times';
import Select from 'components/inputs/Select';

class TimeContainer extends Component {
  
  render() {
    const { value,name } = this.props.field;

    const minutesValue = Math.floor(value%60);
    const hoursValue = Math.floor(value/60)*60;

    return (
      <div>
        <Select          
          label="Hours"
          formControlProps={{ fullWidth: true }}
          selectProps={{
            autoWidth: true,
            onChange:(e) => {
              this.props.form.setFieldValue(name,value + e.target.value - hoursValue)
            },
            value: hoursValue
            
          }}
        >
          {hours.map((time, i) => {
            return (
              <MenuItem
                key={i}
                id="length"
                value={time.asMinutes()}
              >
                {time.format('h:mm', { trim: false })}
              </MenuItem>
            );
          })}
        </Select>
        <Select
          label="Minutes"
          formControlProps={{ fullWidth: true }}
          selectProps={{
            autoWidth: true,
            onChange:(e) => {
              console.log(value,e.target.value,minutesValue)
              this.props.form.setFieldValue(name,value + e.target.value - minutesValue)
            },
            value: minutesValue            
          }}
        >
          {minutes.map((time, i) => {
            return (
              <MenuItem
                key={i}
                id="length"
                value={time.asMinutes()}
              >
                {time.format('h:mm', { trim: false })}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    )
  }
}

export default TimeContainer