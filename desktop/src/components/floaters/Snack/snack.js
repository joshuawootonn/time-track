import React from 'react'

import classNames from 'classnames'
import { Snackbar, SnackbarContent, Icon, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons'
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { withStyles } from '@material-ui/core/styles';

const Success = (props) => {
  const { classes, onClose, position, icon } = props;
  return (
    <Snackbar
      anchorOrigin={position}
      open={true}
      onClose={onClose}>
      <SnackbarContent
        className={classes[props.type]}
        message={
          <div className={classes.content}>
            {props.icon}
            <div className={classes.space} />
            {props.message}
          </div>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar >
  )
}

const styles1 = theme => ({
  success: {
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: 20,
  },
  space: {
    width: 10
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    
  },
});

export default withStyles(styles1)(Success)