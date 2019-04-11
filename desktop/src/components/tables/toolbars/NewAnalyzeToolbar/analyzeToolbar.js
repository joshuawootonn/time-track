import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core';
import { Add, FilterList } from '@material-ui/icons';

import styles from './styles';

export class AnalyzeToolbar extends Component {
  render() {
    const { selected, classes, add, filters, isFilterVisible, toggleFilter, label,selectLabel } = this.props;
    
    return (
      <div style={{ position: `relative` }}>
        <Toolbar
          className={cx(classes.toolbarRoot, {
            [classes.highlight]: Object.keys(selected).length !== 0
          })}
        >
          <div className={classes.title}>
            {Object.keys(selected).length !== 0 ? (
              <Typography color="inherit" variant="h6" >
                {selectLabel(selected)}
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle">
                {label}
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          {toggleFilter &&<div className={classes.actions}>       
            <Tooltip title="Filter">
              <IconButton color={isFilterVisible ? `secondary` : `default`} onClick={toggleFilter}>
                <FilterList />
              </IconButton>
            </Tooltip>
          </div>}
          {add &&<div className={classes.actions}>       
            <Tooltip title="Add">
              <IconButton onClick={add}>
                <Add />
              </IconButton>
            </Tooltip>
          </div>}
        </Toolbar>        
      </div>      
    );
  }
}
AnalyzeToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  add: PropTypes.func,
  filter: PropTypes.func,
  label: PropTypes.string.isRequired,
  selectLabel: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func,
  filters: PropTypes.object,
  isFilterVisible: PropTypes.bool
};

export default withStyles(styles)(AnalyzeToolbar);
