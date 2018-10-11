import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { ShowChart, Check, Close, ArrowBack, Storage } from '@material-ui/icons';

import styles from './styles';

const AccountActionForm = props => {
  const { classes, isWorking, clockIn, clockOut, analyze, back } = props;
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        {isWorking ? (
          <Tooltip open={true} title="Clock Out" classes={{ tooltip: classes.toolTip }} placement="bottom">
            <IconButton onClick={clockOut} className={classes.button}>
              <Close className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip open={true} title="Clock In" classes={{ tooltip: classes.toolTip }} placement="bottom">
              <IconButton onClick={clockIn} className={classes.button}>
                <Check className={classes.buttonIcon} />
              </IconButton>
            </Tooltip>
          )}
        <Tooltip open={true} title="Export" classes={{ tooltip: classes.toolTip }} placement="bottom">
          <IconButton onClick={props.export} className={classes.button}>
            <Storage className={classes.buttonIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip open={true} title="Analysis" classes={{ tooltip: classes.toolTip }} placement="bottom">
          <IconButton onClick={analyze} className={classes.button}>
            <ShowChart className={classes.buttonIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip open={true} title="Back" classes={{ tooltip: classes.toolTip }} placement="bottom">
          <IconButton onClick={back} className={classes.button}>
            <ArrowBack className={classes.buttonIcon} />
          </IconButton>
        </Tooltip>

      </div>
    </div>
  );
};

AccountActionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
  clockIn: PropTypes.func.isRequired,
  isWorking: PropTypes.number,
  clockOut: PropTypes.func.isRequired,
  export: PropTypes.func.isRequired,
  analyze: PropTypes.func.isRequired
};

export default withStyles(styles)(AccountActionForm);
