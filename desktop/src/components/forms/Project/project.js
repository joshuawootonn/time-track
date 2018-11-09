import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  Grid,  Typography,  Button,  Tooltip,  IconButton } from '@material-ui/core';
import cx from 'classnames';
import { Field, Form, FieldArray } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import { Delete,Close } from '@material-ui/icons';

import TextField from 'components/inputs/TextField';
import Switch from 'components/inputs/Switch';
import Time from 'components/inputs/Time';
import Select from 'components/inputs/Select';
import styles from './styles';


class Project extends Component {
  render() {

    const { classes,label, type,deleteProject,categories, subcategories, tasks, isSubmitting, resetForm, initialValues,errors,values } = this.props;
    console.log(tasks);
    return (
      <Form>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={12} className={cx(classes.headerRow,classes.row)}>
            <Typography variant="h6">{label}</Typography>
            {type === 'edit' && (
              <Tooltip title="Delete">
                <IconButton onClick={deleteProject} aria-label="Delete">
                  <Delete />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item xs={12}  className={classes.row}>
            <Field
              name="name"
              component={TextField}
              margin="none"
              label="Task Name"
              type="search"
              className={classes.field}
              helper="normal"
            />           
          </Grid>
          <Grid item xs={12} className={classes.row}>
            <Field
              name="date"
              component={TextField}              
              margin="none"
              label="Start Date"
              type="date"              
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
                          <div className={cx(classes.row,classes.bodyRow)}>
                            <Field
                              name={`projectTasks.${index}.categoryId`}
                              component={Select}
                              items={categories}
                              fullWidth
                              label="Category"
                              className={classes.field}
                            />
                            <Field
                              name={`projectTasks.${index}.subcategoryId`}
                              component={Select}
                              items={subcategories.filter(subcat => {
                                return subcat.categoryId === projectTasks.categoryId;
                              })}
                              fullWidth
                              label="Subcategory"
                              className={classes.field}
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
                            <div className={classes.verticalCenter}>
                              <IconButton
                                type="button"
                                color="secondary"
                                className={classes.iconButton}
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
                  <Grid item xs={12} className={cx(classes.row,classes.footerRow)}>
                    <div className={classes.lunchBox}>
                      
                    </div>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() =>
                        arrayHelpers.push({                          
                          categoryId: -1,
                          subcategoryId: -1,
                          taskId: -1
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

Project.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  deleteProject: PropTypes.func,
  resetForm: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  subcategories:PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired
};

export default withStyles(styles)(Project);