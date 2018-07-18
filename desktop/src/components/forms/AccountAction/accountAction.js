import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ShowChart, Check, ArrowBack } from '@material-ui/icons';

import styles from './styles';

const AccountActionForm = props => {
  const { classes } = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        <IconButton className={classes.button}>
          <Check className={classes.buttonIcon} />
        </IconButton>
        <IconButton className={classes.button}>
          <ShowChart className={classes.buttonIcon} />
        </IconButton>
        <IconButton onClick={props.back} className={classes.button}>
          <ArrowBack className={classes.buttonIcon} />
        </IconButton>
      </div>
    </div>
  );
};

AccountActionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountActionForm);
