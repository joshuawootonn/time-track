import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, CircularProgress } from '@material-ui/core';

import styles from './style';

export const Progress = props => {
  const { classes, fullPage, fullHeight, fullWidth, variant } = props;

  const wrapperClasses = cx({
    [classes.fullPageWrapper]: fullPage,
    [classes.fullHeight]: !fullPage && fullHeight,
    [classes.fullWidth]: !fullPage && fullWidth
  });


  const innerClasses = cx({
    [classes.fullPageInner]: fullPage,
    [classes.fullHeight]: !fullPage && fullHeight,
    [classes.fullWidth]: !fullPage && fullWidth,
    [classes.flex] : true
  });


  return (
    <div className={wrapperClasses}>
      <div className={innerClasses}>
        {variant === 'linear' ? <LinearProgress /> : null}
        {variant === 'circular' ? <CircularProgress /> : null}
      </div>
    </div>
  );
};

Progress.defaultProps = {
  fullWidth: false,
  fullHeight: false,
  fullPage: false,
  variant: 'circular'
};

Progress.propTypes = {
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullPage: PropTypes.bool,
  variant: PropTypes.oneOf(['circular', 'linear']),
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Progress);