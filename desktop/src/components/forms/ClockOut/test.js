import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export default (props) => (

  <FieldArray
    name="activities"
    render={arrayHelpers => (
      <div>
        {props.values.activities &&
          props.values.activities.map((activity, index) => (
            <div key={index}>
              <Field name={`activities.${index}.projectTask`} />
              <Field name={`activities.${index}.length`} />
              <Field name={`activities.${index}.description`} />
              <IconButton
                type="button"
                onClick={() => arrayHelpers.remove(index)}
              >
                <Close />
              </IconButton>
            </div>
          ))}
        <Button color="primary" type="button" onClick={() => arrayHelpers.push({ projectTask: 'ghdf', length: 500, description: '' })}>
          Add Activity
              </Button>
      </div>
    )}
  />


);