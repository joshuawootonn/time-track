import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, Form } from 'formik';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import styles from './styles';
import TextField from '~/components/inputs/TextField';
import Select from '~/components/inputs/Select';
import Switch from '~/components/inputs/Switch';

import TypeableSelect from '~/components/inputs/TypeableSelect';

export class Task extends Component {
  render() {
    const {
      label,
      removeTask,
      type,
      classes,
      categories,
      subcategories,
      isSubmitting,
      resetForm,
      initialValues,
      errors,
      setFieldValue
    } = this.props;
    return (
      <Form>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {[`edit`].includes(type) && (
              <Tooltip title="Delete">
                <IconButton onClick={removeTask}>
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="name"
              component={TextField}
              margin="none"
              label="Task Name"
              type="search"
              className={classes.field}
              helper="normal"
            />
            <Field
              name="isActive"
              component={Switch}
              label="Active"
              className={classes.field}
            />
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="categoryId"
              component={TypeableSelect}
              items={categories}
              type="type"
              fullWidth
              label="Category"
              className={classes.field}
              id={`${TASK_FORM_CATEGORY_FIELD_ID}`}
              onChange={() => setFieldValue(`subcategoryId`, -1)}
            />
            <Field
              name="subcategoryId"
              component={TypeableSelect}
              items={subcategories.filter(subcat => {
                return subcat.categoryId === this.props.values.categoryId;
              })}
              type="type"
              fullWidth
              label="Subcategory"
              className={classes.field}
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
                id={`${TASK_FORM_SUBMIT_BUTTON_ID}`}
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length !== 0}
                variant="contained"
                className={classes.button}
              >
                {[`add`, `edit`].includes(type) ? `Save` : `Apply`}
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                id={`${TASK_FORM_RESET_BUTTON_ID}`}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
              {[`filter`].includes(type) && (
                <Button
                  onClick={() => {
                    resetForm(initialValues);
                    this.props.clearFilter();
                  }}
                  id={`${TASK_FORM_CLEAR_BUTTON_ID}`}
                  disabled={isSubmitting}
                  color="secondary"
                  variant="text"
                  className={classes.button}
                >
                  Clear
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export const TASK_FORM_RESET_BUTTON_ID = `task_form_reset_button`;
export const TASK_FORM_CLEAR_BUTTON_ID = `task_form_clear_button`;
export const TASK_FORM_SUBMIT_BUTTON_ID = `task_form_submit_button`;
export const TASK_FORM_CATEGORY_FIELD_ID = `task_form_category_field_button`;

Task.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  removeTask: PropTypes.func,
  type: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  clearFilter: PropTypes.func
};

export default withStyles(styles)(Task);
