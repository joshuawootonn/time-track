import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {Button,IconButton} from '@material-ui/core'
import {Check,Close} from '@material-ui/icons'
// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export default () => (
  
    <Formik
      initialValues={{ friends: ['jared', 'ian', 'brent'] }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={({ values }) => (
        <Form>
          <FieldArray
            name="friends"
            render={arrayHelpers => (
              <div>
                {values.friends &&
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <Field name={`friends.${index}`} />
                      <IconButton
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} 
                      >
                        <Close />
                      </IconButton>                     
                    </div>
                  ))}
                  <Button type="button" onClick={() => arrayHelpers.push('')}>
                    Add a friend
                  </Button>  
              </div>
            )}
          />
        </Form>
      )}
    />
);