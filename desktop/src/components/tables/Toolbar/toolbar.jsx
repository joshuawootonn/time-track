import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Toolbar as MUToolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { Add, FilterList } from '@material-ui/icons'

import styles from './styles'

// ICEBOX: Test Table

export class Toolbar extends Component {
  render() {
    const {
      selected,
      classes,
      add,
      isFilterVisible,
      toggleFilter,
      label,
      selectLabel,
      children,
    } = this.props

    return (
      <div
        style={{
          position: `relative`,
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        }}
      >
        <MUToolbar
          className={cx(classes.toolbarRoot, {
            [classes.highlight]: Object.keys(selected).length !== 0,
          })}
        >
          <div className={classes.title}>
            {Object.keys(selected).length !== 0 ? (
              <Typography color="inherit" variant="h6">
                {selectLabel(selected)}
              </Typography>
            ) : (
              <Typography variant="h6" id="tableTitle">
                {label}
              </Typography>
            )}
          </div>
          {children}
          <div className={classes.buttonBox}>
            {toggleFilter && (
              <div className={classes.actions}>
                <Tooltip title="Filter">
                  <IconButton
                    color={isFilterVisible ? `secondary` : `default`}
                    onClick={toggleFilter}
                  >
                    <FilterList />
                  </IconButton>
                </Tooltip>
              </div>
            )}
            {add && (
              <div className={classes.actions}>
                <Tooltip title="Add">
                  <IconButton onClick={add}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </MUToolbar>
      </div>
    )
  }
}
Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  add: PropTypes.func,
  filter: PropTypes.func,
  label: PropTypes.string.isRequired,
  selectLabel: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func,
  isFilterVisible: PropTypes.bool,
}

export default withStyles(styles)(Toolbar)
