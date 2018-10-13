import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Delete, FilterList } from '@material-ui/icons';
import styles from './styles';

let EnhancedTableToolbar = props => {
  const { selected, classes } = props;
  console.log(selected);
  return (
    <Toolbar
      className={classNames(classes.toolbarRoot, {
        [classes.highlight]: Object.keys(selected).length !== 0
      })}
    >
      <div className={classes.title}>
        {Object.keys(selected).length !== 0 ? (
          <Typography color="inherit" variant="h6">
            {selected.firstName} {selected.lastName} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
              Employees
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {Object.keys(selected).length !== 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Delete />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterList />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTableToolbar);
