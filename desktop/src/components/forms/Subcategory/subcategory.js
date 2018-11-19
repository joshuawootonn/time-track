import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button,Tooltip,IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import TextField from 'components/inputs/TextField';
import Select from 'components/inputs/Select';
import styles from './styles';

class Crew extends Component {
  render() {
    const { classes, errors, initialValues, resetForm, isSubmitting, label,type,removeSubcategory,categories } = this.props;
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.row}>
            <Typography variant="h6">{label}</Typography>
            {type === 'edit' && (
              <Tooltip title="Delete">
                <IconButton onClick={removeSubcategory} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="categoryId"
              component={Select}
              items={categories}
              fullWidth
              label="Authority"
              className={classes.field}
            />
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
                  resetForm(initialValues);
                }}
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
    );
  }
}

Crew.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  removeSubcategory: PropTypes.func.isRequired
};


export default withStyles(styles)(Crew);