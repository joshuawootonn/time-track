import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, IconButton, MenuItem, Input, FormControl, InputLabel, Select } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'

// import Select from 'components/inputs/Select';

const items = [{ id: 1, name: "name" }, { id: 2, name: 'eman' }];


export default (props) => (

  <FieldArray
    name="activities"
    render={arrayHelpers => (
      <div>
        {props.values.activities &&
          props.values.activities.map((activity, index) => {
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


);


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
