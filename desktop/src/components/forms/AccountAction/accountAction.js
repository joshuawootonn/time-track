import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ShowChart, Check, Close, ArrowBack, Storage } from '@material-ui/icons';

import styles from './styles';

const AccountActionForm = props => {
  const { classes, isWorking,clockIn,clockOut,analyze,back } = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        {isWorking ? (
          <IconButton onClick={clockOut} className={classes.button}>
            <Close className={classes.buttonIcon} />
          </IconButton>
        ) : (
          <IconButton onClick={clockIn} className={classes.button}>
            <Check className={classes.buttonIcon} />
          </IconButton>
        )}
        <IconButton onClick={props.export} className={classes.button}>
          <Storage className={classes.buttonIcon} />
        </IconButton>
        <IconButton onClick={analyze} className={classes.button}>
          <ShowChart className={classes.buttonIcon} />
        </IconButton>
        <IconButton onClick={back} className={classes.button}>
          <ArrowBack className={classes.buttonIcon} />
        </IconButton>
      </div>
    </div>
  );
};

AccountActionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
  clockIn: PropTypes.func.isRequired,
  isWorking: PropTypes.bool,
  clockOut: PropTypes.func.isRequired,
  export: PropTypes.func.isRequired,
  analyze: PropTypes.func.isRequired
};

export default withStyles(styles)(AccountActionForm);
