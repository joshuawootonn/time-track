import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, Button, IconButton } from '@material-ui/core';
import cx from 'classnames';
import { Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';

import TextField from 'components/inputs/TextField';
import Switch from 'components/inputs/Switch';
import Select from 'components/inputs/Select';
import styles from './styles';


export class Project extends Component {
  render() {

    const { classes, label, categories, subcategories, tasks, 
      isSubmitting, resetForm, initialValues, errors, values, type } = this.props;
 
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow, classes.row)}>
            <Typography variant="h6">{label}</Typography>          
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="name"
              component={TextField}
              margin="none"
              label="Project Name"
              type="search"
              className={classes.field}
              helper="normal"
            />
            {[`add`,`edit`].includes(type) && (
              <Field
                name="date"
                component={TextField}
                margin="none"
                label="Start Date"
                type="date"
                className={classes.field}
                helper="normal"
              />)}
            <Field
              name="isActive"
              component={Switch}
              label="Active"
              className={classes.field}
            />
          </Grid>
          { [`filter`].includes(type) && (
            <Grid item xs={12} className={classes.row}>            
              <Field
                name="startTime"
                component={TextField}
                margin="none"
                label="Start Date"
                type="date"
                className={classes.field}
                helper="normal"
              />
              <Field
                name="endTime"
                component={TextField}
                margin="none"
                label="End Date"
                type="date"
                className={classes.field}
                helper="normal"
              />
            </Grid>)}
          { [`add`,`edit`].includes(type) && (
            <FieldArray
              name="projectTasks"
              render={arrayHelpers => {

                return (
                  <Grid item xs={12} container className={classes.body}>
                    {values.projectTasks &&
                    values.projectTasks.map((projectTasks, index) => {
                      return (
                        <Grid item xs={12}
                          key={index}
                          className={cx(
                            classes.card,
                            classes.verticalCenterBox,
                          )}
                        >
                          <div className={cx(classes.row, classes.bodyRow)}>
                            <Field
                              name={`projectTasks.${index}.categoryId`}
                              component={Select}
                              items={categories}
                              id={`${PROJECT_FORM_CATEGORY_FIELD_ID}_${index}`}
                              fullWidth
                              label="Category"
                              className={classes.field}
                              onChange={() => {
                                arrayHelpers.form.setFieldValue(
                                  `projectTasks.${index}.subcategoryId`,
                                  -1,
                                );
                                arrayHelpers.form.setFieldValue(
                                  `projectTasks.${index}.taskId`,
                                  -1,
                                );
                              }}
                            />
                            <Field
                              name={`projectTasks.${index}.subcategoryId`}
                              component={Select}
                              items={subcategories.filter(subcat => {
                                return subcat.categoryId === projectTasks.categoryId;
                              })}
                              id={`${PROJECT_FORM_SUBCATEGORY_FIELD_ID}_${index}`}
                              fullWidth
                              label="Subcategory"
                              className={classes.field}
                              onChange={() => {
                                arrayHelpers.form.setFieldValue(
                                  `projectTasks.${index}.taskId`,
                                  -1,
                                );
                              }}
                            />
                            <Field
                              name={`projectTasks.${index}.taskId`}
                              component={Select}
                              items={tasks.filter(globalTask => {
                                return globalTask.subcategory.id === projectTasks.subcategoryId && globalTask.category.id === projectTasks.categoryId;
                              })}
                              fullWidth
                              label="Task"
                              className={classes.field}
                            />
                            <Field                              
                              name={`projectTasks.${index}.estimateTime`}
                              component={TextField}
                              fullWidth
                              label="Estimated Time"
                              className={classes.field}
                            />
                            <Field                              
                              name={`projectTasks.${index}.quantity`}
                              component={TextField}
                              fullWidth
                              label="Quantity"
                              className={classes.field}
                            />
                            <div className={classes.verticalCenter}>
                              <IconButton
                                type="button"
                                color="secondary"
                                className={classes.iconButton}
                                id={`${PROJECT_FORM_REMOVE_PROJECT_TASK_BUTTON_ID}_${index}`}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Close />
                              </IconButton>
                            </div>
                          </div>
                        </Grid>
                      );
                    })
                    }
                    <Grid item xs={12} className={cx(classes.row, classes.footerRow)}>
                      <div className={classes.lunchBox}>

                      </div>
                      <Button
                        color="primary"
                        variant="contained"
                        id={PROJECT_FORM_ADD_PROJECT_TASK_BUTTON_ID}
                        onClick={() =>
                          arrayHelpers.push({
                            categoryId: -1,
                            subcategoryId: -1,
                            taskId: -1,
                            quantity: 1,
                            estimateTime: 1
                          })
                        }
                      >
                      Add Task
                      </Button>
                    </Grid>
                  </Grid>
                );
              }
              }
            />
          )}
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
                id={PROJECT_FORM_SUBMIT_BUTTON_ID}
                color="primary"
                disabled={isSubmitting || Object.keys(errors).length !== 0 }
                variant="contained"
                className={classes.button}
              >
                {[`add`,`edit`].includes(type) ? `Save`: `Apply`}
              </Button>
              <Button
                onClick={() => {
                  resetForm(initialValues);
                }}
                id={PROJECT_FORM_RESET_BUTTON_ID}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Reset
              </Button>
              {[`filter`].includes(type) && 
              <Button
                onClick={() => {
                  resetForm(initialValues);                  
                  this.props.clearFilter();
                }}
                id={PROJECT_FORM_CLEAR_BUTTON_ID}
                disabled={isSubmitting}
                color="secondary"
                variant="text"
                className={classes.button}
              >
                Clear
              </Button>}
              
            </div>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export const PROJECT_FORM_RESET_BUTTON_ID = `project_form_reset_button`;
export const PROJECT_FORM_CLEAR_BUTTON_ID = `project_form_clear_button`;
export const PROJECT_FORM_SUBMIT_BUTTON_ID = `project_form_submit_button`;
export const PROJECT_FORM_ADD_PROJECT_TASK_BUTTON_ID = `project_form_add_project_task_button`;
export const PROJECT_FORM_REMOVE_PROJECT_TASK_BUTTON_ID = `project_form_remove_project_task_button`;
export const PROJECT_FORM_CATEGORY_FIELD_ID = `project_form_category_field`;
export const PROJECT_FORM_SUBCATEGORY_FIELD_ID = `project_form_subcategory_field`;

Project.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeProject: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  clearFilter: PropTypes.func
};

export default withStyles(styles)(Project);