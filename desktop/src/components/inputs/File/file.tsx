import { useState } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  InputLabel,
  FormControl,
  Input,
  FormHelperText,
} from '@material-ui/core'
import { getIn } from 'formik'

import styles from './styles'

export type FileFormat = 'excel' | 'csv'

type Props = {
  form: any
  label: any
  labelProps: any
  formControlProps: any
  margin: `normal` | `dense` | `none`
  classes: any
  field: any
  helper: `normal` | `none`
  fullWidth: boolean
  format: FileFormat
}

function File({
  form,
  label,
  labelProps,
  formControlProps,
  margin,
  classes,
  field,
  helper,
  fullWidth,
  format,
}: Props) {
  const [path, setPath] = useState()

  const fileChange = (e: any) => {
    const path = e.target.files[0].path
    setPath(path)
    form.setFieldValue(field.name, path)
  }

  return (
    <FormControl {...formControlProps} fullWidth={fullWidth} margin={margin}>
      <div className={classes.row}>
        {label !== undefined ? (
          <InputLabel shrink {...labelProps}>
            {label}
          </InputLabel>
        ) : null}
        <Input fullWidth={fullWidth} {...field} value={path} />
        <input
          accept={format === 'excel' ? '.xlsx, .xls' : '.csv'}
          id="contained-button-file"
          className={classes.inputToHide}
          type="file"
          onChange={fileChange}
        />
        <label htmlFor="contained-button-file" className={classes.buttonAlign}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.button}
          >
            Select File
          </Button>
        </label>
      </div>
      {helper === `normal` && (
        <FormHelperText error={true}>
          {getIn(form.touched, field.name)
            ? getIn(form.errors, field.name)
            : ` `}
        </FormHelperText>
      )}
    </FormControl>
  )
}

File.defaultProps = {
  margin: `normal`,
  fullWidth: false,
  helper: `normal`,
}

File.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  margin: PropTypes.oneOf([`normal`, `dense`, `none`]),
  fullWidth: PropTypes.bool,
  helper: PropTypes.oneOf([`normal`, `none`]),
}

// @ts-expect-error: types
export default withStyles(styles)(File)
