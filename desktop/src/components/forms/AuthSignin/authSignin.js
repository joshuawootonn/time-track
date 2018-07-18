import React from 'react';
import PropTypes from 'prop-types';

import { Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const AuthSigninForm = props => {
  const { classes, username, password, error, onSubmit, onChange } = props;
  const isInvalid = password === '' || username === '';
  return (
    <div className={classes.hero}>
      <form onSubmit={onSubmit} className={classes.heroContent}>
        <Typography variant="title">Select Network</Typography>
        <TextField
          label="Name"
          className={classes.textField}
          value={username}
          onChange={onChange}
          margin="normal"
          name="username"
        />
        <TextField
          label="Password"
          className={classes.textField}
          type="password"
          margin="normal"
          onChange={onChange}
          value={password}
          name="password"
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
      </form>
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
