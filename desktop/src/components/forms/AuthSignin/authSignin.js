import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field, Form } from 'formik';

import TextField from 'components/inputs/TextField';
import Password from 'components/inputs/Password';
import styles from './styles';

const AuthSigninForm = props => {
  const { classes, username, password, error, onSubmit, onChange } = props;
  const isInvalid = password === '' || username === '';
  return (
    <div className={classes.hero}>
      <Form className={classes.heroContent}>
        <Typography variant="title">Select Network</Typography>
        <Field 
          component={TextField}
          name="username"
          label="Network"
        />
        <Field 
          component={Password}
          name="password"
          label="Password"
        />          
        <Button
          type="submit"
          disabled={isInvalid}
          color="primary"
          variant="contained"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Form>
      <div className={classes.error}>
        {error && (
          <Typography color="error" variant="button">
            {error.message}
          </Typography>
        )}
      </div>
    </div>
  );
};

AuthSigninForm.propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(AuthSigninForm);
