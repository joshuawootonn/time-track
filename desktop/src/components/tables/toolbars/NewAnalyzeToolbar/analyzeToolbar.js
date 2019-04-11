import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Tooltip, Card } from '@material-ui/core';
import { Add, FilterList } from '@material-ui/icons';

import styles from './styles';

export class AnalyzeToolbar extends Component {
  state = {
    isExpanded: false
  }
  toggleExpansion = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  }
  setFilters = () => {
    this.props.setFilters();
  }

  render() {
    const { selected, classes, add, filters, label,selectLabel } = this.props;
    const { isExpanded } = this.state;
    console.log(selected);
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
          {filters &&<div className={classes.actions}>       
            <Tooltip title="Filter">
              <IconButton color={isExpanded ? `secondary` : `default`} onClick={this.toggleExpansion}>
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
        {this.state.isExpanded && 
          <Card style={{ position: `absolute`, top: `70px`, left: `2.5%`, zIndex: 900, width: `95%`, minHeight: `100px` }}>
            {this.props.children}
          </Card>}
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
  setFilters: PropTypes.func,
  filters: PropTypes.object,
  children: PropTypes.node
};

export default withStyles(styles)(AnalyzeToolbar);
