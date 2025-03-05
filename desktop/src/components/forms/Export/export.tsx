import { useState } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core'
import { Field, Form } from 'formik'

import styles from './styles'

import TextField from '~/components/inputs/TextField'
import File from '~/components/inputs/File'
import { FileFormat } from '~/components/inputs/File/file'

type Props = {
  classes: any
  cancel: any
  isSubmitting: boolean
  errors: any
  values: any
  format: FileFormat
  onFormatChange: (format: FileFormat) => void
}

export function Export({
  classes,
  cancel,
  isSubmitting,
  errors,
  values,
  format,
  onFormatChange,
}: Props) {
  function handleFormatChange(event: any) {
    onFormatChange(event.target.value)
  }

  return (
    <Form className={classes.heroContent}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h3">
            Export to {format === 'excel' ? 'Excel' : 'CSV'}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.row}>
          <Field
            name="start"
            component={TextField}
            margin="none"
            label="From"
            type="date"
            helper="normal"
          />
          <Field
            name="end"
            component={TextField}
            margin="none"
            label="To"
            type="date"
            helper="normal"
          />
        </Grid>
        <Grid item xs={12} className={classes.row}>
          <FormLabel>Format</FormLabel>
          <RadioGroup
            aria-label="Export format"
            name="exportFormat"
            value={format}
            onChange={handleFormatChange}
            row
          >
            <FormControlLabel value="excel" control={<Radio />} label="Excel" />
            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="fileLocation"
            component={File}
            label="File"
            fullWidth
            margin="none"
            type="file"
            format={format}
          />
        </Grid>
        <Grid item xs={12} className={classes.row}>
          <Typography variant="body1" className={classes.error}>
            {errors[Object.keys(errors)[0]]}
          </Typography>
          <div>
            <Button
              type="submit"
              color="primary"
              disabled={
                isSubmitting ||
                Object.keys(errors).length !== 0 ||
                values.fileLocation.length === 0
              }
              variant="contained"
            >
              Export
            </Button>
            <Button
              onClick={cancel}
              color="secondary"
              variant="text"
              className={classes.spaceAround}
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}

Export.propTypes = {
  values: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  cancel: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  errors: PropTypes.object,
}

// @ts-expect-error: types
export default withStyles(styles)(Export)
