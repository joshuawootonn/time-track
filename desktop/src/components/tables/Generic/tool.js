import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import styles from './styles';

let EnhancedTableToolbar = props => {
  const { classes, add,label } = props;
  return (
    <Toolbar
      className={classes.toolbarRoot}
    >
      <div className={classes.title}>        
        <Typography variant="h6" id="tableTitle">
          {label}
        </Typography>        
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>       
        <Tooltip title="Add">
          <IconButton aria-label="Add" onClick={add}>
            <Add />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(EnhancedTableToolbar);
