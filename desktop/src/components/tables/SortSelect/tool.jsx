import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar, Typography, IconButton, Tooltip } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import styles from './styles'

export const SortSelectToolbar = (props) => {
  const { selected, classes, add, label, selectLabel } = props
  return (
    <Toolbar
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
      <div className={classes.spacer} />
      {add && (
        <div className={classes.actions}>
          <Tooltip title="Add">
            <IconButton aria-label="Add" onClick={add}>
              <Add />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  )
}

SortSelectToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  add: PropTypes.func,
  label: PropTypes.string.isRequired,
  selectLabel: PropTypes.func.isRequired,
}

export default withStyles(styles)(SortSelectToolbar)
