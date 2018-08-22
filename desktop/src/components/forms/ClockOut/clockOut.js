import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, IconButton, MenuItem, 
  Input, FormControl, InputLabel, Select } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Close } from '@material-ui/icons'
import moment from 'moment';

import styles from './styles';


const items = [{ id: 1, name: "name" }, { id: 2, name: 'eman' }];

class ClockOutForm extends Component {

  render() {
    const { classes, isSubmitting, cancel, shift, values } = this.props;
    //console.log(values)
    return (
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <Form>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <div className={classes.lineBox}>
                  <Typography variant="title" >
                    Date:
                  </Typography>
                  <Typography variant="title" >
                    {shift.date}
                  </Typography>
                </div>
                <div className={classes.lineBox}>
                  <Typography variant="title" >
                    Time:
                  </Typography>
                  <Typography variant="title" >
                    {shift.in} - {shift.out}
                  </Typography>
                </div>
                <div className={classes.lineBox}>
                  <Typography variant="title" >
                    Time Worked:
                  </Typography>
                  <Typography variant="title" >
                    {shift.length}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <FieldArray
                  name="activities"
                  render={arrayHelpers => (
                    <div>
                      {this.props.values.activities &&
                        this.props.values.activities.map((activity, index) => {
                          return (<div key={index}>
                            <Field name={`activities.${index}.projectTask`}
                              render={({ field }) => (
                                <CustomSelect
                                  labelText="Select"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  selectProps={{
                                    autoWidth: true,
                                    ...field,
                                    input: <Input name={`activities.${index}.projectTask`} />
                                  }}
                                >
                                  {items.map((item, i) => {
                                    return (
                                      <MenuItem key={i} value={item.id}>
                                        {item.name}
                                      </MenuItem>
                                    );
                                  })}
                                </CustomSelect>
                              )}
                            />


                            <Field name={`activities.${index}.projectTask`} />
                            <Field value={activity.length} name={`activities.${index}.length`} />
                            <Field value={activity.description} name={`activities.${index}.description`} />
                            <IconButton
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <Close />
                            </IconButton>
                          </div>)
                        }

                        )}
                      <Button color="primary" type="button" onClick={() => arrayHelpers.push({ projectTask: 'ghdf', length: 500, description: '' })}>
                        Add Activity
                      </Button>
                    </div>
                  )
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <div className={classes.buttonBox} >
                  <Button
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                    variant="contained"
                    className={classes.button}
                  >
                    Enter
                </Button>
                  <Button
                    onClick={cancel}
                    color="secondary"
                    variant="text"
                    className={classes.button}
                  >
                    Cancel
                </Button>
                </div>
              </Grid>
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}

ClockOutForm.propTypes = {
  classes: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
};

export default withStyles(styles)(ClockOutForm);





function CustomSelect({ ...props }) {
  const { classes, formControlProps, LabelProps, labelText, id, selectProps, handleChange, handleBlur, values, children } = props;
  return (
    <FormControl
      {...formControlProps}
    >
      {labelText !== undefined ? (
        <InputLabel
          htmlFor={id}
          {...LabelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
        // onBlur={handleBlur(id)}
        // onChange={handleChange(id)}
        {...selectProps}
      >
        {children}
      </Select>
    </FormControl>
  );
}
