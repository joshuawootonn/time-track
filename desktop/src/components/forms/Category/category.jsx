import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Grid,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Form, Field } from 'formik'
import { withStyles } from '@material-ui/core/styles'
import TextField from '~/components/inputs/TextField'
import styles from './styles'

export class Category extends Component {
  render() {
    const {
      classes,
      errors,
      initialValues,
      resetForm,
      isSubmitting,
      label,
      type,
      removeCategory,
    } = this.props
    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.row}>
            <Typography variant="h6">{label}</Typography>
            {type === `edit` && (
              <Tooltip title="Delete">
                <IconButton onClick={removeCategory} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="type"
              component={TextField}
              margin="none"
              label="Type"
              type="search"
              className={classes.field}
              helper="normal"
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Typography
              color="error"
              variant="button"
              className={classes.field}
            >
              {errors.submit}
            </Typography>
            <div>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                variant="contained"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues)
                }}
                id="category-reset-button"
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    )
  }
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  removeCategory: PropTypes.func,
  type: PropTypes.string.isRequired,
}

export default withStyles(styles)(Category)
