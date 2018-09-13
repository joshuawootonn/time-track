import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Field, Form } from 'formik';

import TextField from 'components/inputs/TextField';
import Password from 'components/inputs/Password';
import styles from './styles';

const AuthSigninForm = props => {
  const { classes, isSubmitting, globalError } = props;

  return (
    <div className={classes.hero}>
      <Form className={classes.heroContent}>
        <Typography variant="title">Select Network</Typography>
        <Field component={TextField} name="username" label="Network" />
        <Field component={Password} name="password" label="Password" />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Form>
      <div className={classes.error}>
        <Typography color="error" variant="button">
          {globalError}
        </Typography>
      </div>
    </div>
  );
};

AuthSigninForm.propTypes = {
  classes: PropTypes.object.isRequired,
  globalError: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
};

export default withStyles(styles)(AuthSigninForm);
