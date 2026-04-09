import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { MenuItem, FormHelperText, FormControl } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import { minutes, hours } from '~/constants/times'
import Select from '~/components/inputs/Select'
import { getHelperText } from '~/components/utils/getHelperText'
import styles from './styles'

export class Time extends Component {
  onChangeHours = (e) => {
    const { field, form } = this.props
    const hoursValue = Math.floor(field.value / 60) * 60
    form.setFieldValue(field.name, field.value + e.target.value - hoursValue)
  }
  onChangeMinutes = (e) => {
    const { field, form } = this.props
    const minutesValue = Math.floor(field.value % 60)
    form.setFieldValue(field.name, field.value + e.target.value - minutesValue)
  }
  render() {
    const { value } = this.props.field
    const {
      classes,
      field,
      form,
      margin,
      fullWidth,
      label1,
      label2,
      helper,
      className,
      menuItemClassName,
      errorTextStyles,
      suffix1,
      suffix2,
      compact,
    } = this.props

    const minutesValue = Math.floor(value % 60)
    const hoursValue = Math.floor(value / 60) * 60

    return (
      <FormControl
        fullWidth={fullWidth}
        className={cx(
          classes.fieldWrapper,
          classes.vertical,
          compact && classes.autoWidth,
        )}
      >
        <div
          className={cx(
            classes.fieldWrapper,
            classes.horizontal,
            compact && classes.autoWidth,
          )}
        >
          <div
            className={cx(
              classes.selectWithSuffix,
              compact && classes.autoWidth,
            )}
          >
            <Select
              field={field}
              form={form}
              className={cx(className, classes.hours)}
              margin={margin}
              fullWidth={fullWidth}
              label={label1}
              selectProps={{
                onChange: this.onChangeHours,
                value: hoursValue,
              }}
              value={hoursValue}
              helper="none"
            >
              {hours.map((item, i) => {
                return (
                  <MenuItem
                    key={i}
                    id={item.id}
                    value={item.value}
                    className={menuItemClassName}
                  >
                    {item.name}
                  </MenuItem>
                )
              })}
            </Select>
            {suffix1 && <span className={classes.suffix}>{suffix1}</span>}
          </div>
          <div
            className={cx(
              classes.selectWithSuffix,
              compact && classes.autoWidth,
            )}
          >
            <Select
              field={field}
              form={form}
              className={className}
              margin={margin}
              fullWidth={fullWidth}
              label={label2}
              selectProps={{
                onChange: this.onChangeMinutes,
                value: minutesValue,
              }}
              value={minutesValue}
              helper="none"
            >
              {minutes.map((item, i) => {
                return (
                  <MenuItem
                    key={i}
                    id={item.id}
                    value={item.value}
                    className={menuItemClassName}
                  >
                    {item.name}
                  </MenuItem>
                )
              })}
            </Select>
            {suffix2 && <span className={classes.suffix}>{suffix2}</span>}
          </div>
        </div>
        {helper === `normal` && (
          <FormHelperText
            className={cx(classes.helper, errorTextStyles)}
            error={true}
          >
            {getHelperText(form, field.name)}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
}
Time.defaultProps = {
  margin: `normal`,
  fullWidth: false,
  label1: `Hours`,
  label2: `Minutes`,
  helper: `normal`,
  suffix1: ``,
  suffix2: ``,
  compact: false,
}

Time.propTypes = {
  margin: PropTypes.oneOf([`normal`, `dense`, `none`]),
  fullWidth: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  className: PropTypes.string,
  helper: PropTypes.oneOf([`normal`, `none`]),
  label1: PropTypes.string,
  label2: PropTypes.string,
  suffix1: PropTypes.string,
  suffix2: PropTypes.string,
  compact: PropTypes.bool,
}

export default withStyles(styles)(Time)
