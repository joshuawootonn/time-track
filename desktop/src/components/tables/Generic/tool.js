import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Add,Delete,Edit } from '@material-ui/icons';

import styles from './styles';

export const GenericToolbar = props => {
  const { classes, add,label,edit,remove } = props;
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
      {add && <div className={classes.actions}>       
        <Tooltip title="Add">
          <IconButton aria-label="Add" onClick={add}>
            <Add />
          </IconButton>
        </Tooltip>
      </div>}
      {edit && <div className={classes.actions}>       
        <Tooltip title="Edit">
          <IconButton aria-label="Edit" onClick={edit}>
            <Edit />
          </IconButton>
        </Tooltip>
      </div>}
      {remove && <div className={classes.actions}>       
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={remove}>
            <Delete />
          </IconButton>
        </Tooltip>
      </div>}
    </Toolbar>
  );
};

GenericToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func,  
  edit: PropTypes.func,
  remove: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(GenericToolbar);