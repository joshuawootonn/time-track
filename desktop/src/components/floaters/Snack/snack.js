import React from 'react';
import PropTypes from 'prop-types';

import {
  Snackbar as MUSnackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

export const Snack = props => {
  const { classes, onClose, position, type, icon, message } = props;
  return (
    <MUSnackbar anchorOrigin={position} open={true} onClose={onClose}>
      <SnackbarContent
        className={classes[type]}
        message={
          <span className={classes.content}>
            {icon && icon}
            {icon && <span className={classes.space} />}
            {message}
          </span>
        }
        action={
          <div>
            {onClose &&  <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={onClose}
            >
              <Close className={classes.icon} />
            </IconButton>}
          </div>
        }
      />
    </MUSnackbar>
  );
};

Snack.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  position: PropTypes.object,
  type: PropTypes.string,
  icon: PropTypes.node,
  message: PropTypes.string
};

export default withStyles(styles)(Snack);
