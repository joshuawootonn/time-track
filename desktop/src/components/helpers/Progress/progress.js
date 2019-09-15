import React from 'react';
import PropTypes, { string } from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  LinearProgress,
  CircularProgress,
  Typography
} from '@material-ui/core';

import styles from './style';

export const Progress = props => {
  const { classes, fullPage, fullHeight, fullWidth, variant, message } = props;

  const wrapperClasses = cx({
    [classes.fullPageWrapper]: fullPage,
    [classes.fullHeight]: !fullPage && fullHeight,
    [classes.fullWidth]: !fullPage && fullWidth
  });

  const innerClasses = cx({
    [classes.fullPageInner]: fullPage,
    [classes.fullHeight]: !fullPage && fullHeight,
    [classes.fullWidth]: !fullPage && fullWidth,
    [classes.flex]: true
  });

  return (
    <div className={wrapperClasses}>
      <div className={innerClasses}>
        {message && (
          <Typography variant="h6" className={classes.typography}>
            {message}
          </Typography>
        )}
        {variant === `linear` ? <LinearProgress /> : null}
        {variant === `circular` ? <CircularProgress size={32} /> : null}
      </div>
    </div>
  );
};

Progress.defaultProps = {
  fullWidth: false,
  fullHeight: false,
  fullPage: false,
  variant: `circular`
};

Progress.propTypes = {
  message: string,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullPage: PropTypes.bool,
  variant: PropTypes.oneOf([`circular`, `linear`]),
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Progress);
