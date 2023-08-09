import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import { IconButton, Tooltip } from '@material-ui/core'
import {
  ShowChart,
  Storage,
  Check,
  Close,
  ArrowBack,
  Fullscreen,
  FullscreenExit,
  Group,
} from '@material-ui/icons'

import styles from './styles'
import * as authorityConstants from '~/constants/authority'

export const AccountAction = (props) => {
  const {
    classes,
    isWorking,
    clockIn,
    clockOut,
    analyze,
    crew,
    back,
    type,
    toggleFullscreen,
    isFullScreen,
    isElectron,
  } = props
  return (
    <div className={classes.hero}>
      <div className={classes.heroContent}>
        {isWorking ? (
          <Tooltip
            open={true}
            title="Clock Out"
            classes={{ tooltip: classes.toolTip }}
            placement="bottom"
          >
            <IconButton onClick={clockOut} className={classes.button}>
              <Close className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip
            open={true}
            title="Clock In"
            classes={{ tooltip: classes.toolTip }}
            placement="bottom"
          >
            <IconButton onClick={clockIn} className={classes.button}>
              <Check className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        )}
        {isElectron &&
          (type === authorityConstants.MANAGER ||
            type === authorityConstants.ADMIN) && (
            <Tooltip
              open={true}
              title="Export"
              classes={{ tooltip: classes.toolTip }}
              placement="bottom"
            >
              <IconButton onClick={props.export} className={classes.button}>
                <Storage className={classes.buttonIcon} />
              </IconButton>
            </Tooltip>
          )}
        {isElectron &&
          (type === authorityConstants.MANAGER ||
            type === authorityConstants.ADMIN) && (
            <Tooltip
              open={true}
              title="FullScreen"
              classes={{ tooltip: classes.toolTip }}
              placement="bottom"
            >
              <IconButton onClick={toggleFullscreen} className={classes.button}>
                {isFullScreen ? (
                  <FullscreenExit className={classes.buttonIcon} />
                ) : (
                  <Fullscreen className={classes.buttonIcon} />
                )}
              </IconButton>
            </Tooltip>
          )}
        {/* CREW FEATRUE THAT IS NOT DEVELOPED YET */}
        {/* {type === authorityConstants.FOREMAN && (
          <Tooltip
            open={true}
            title="Crew"
            classes={{ tooltip: classes.toolTip }}
            placement="bottom"
          >
            <IconButton onClick={crew} className={classes.button}>
              <Group className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        )} */}
        {(type === authorityConstants.ADMIN ||
          type === authorityConstants.FOREMAN) && (
          <Tooltip
            open={true}
            title={type === authorityConstants.ADMIN ? 'Analysis' : 'Projects'}
            classes={{ tooltip: classes.toolTip }}
            placement="bottom"
          >
            <IconButton onClick={analyze} className={classes.button}>
              <ShowChart className={classes.buttonIcon} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          open={true}
          title="Back"
          classes={{ tooltip: classes.toolTip }}
          placement="bottom"
        >
          <IconButton onClick={back} className={classes.button}>
            <ArrowBack className={classes.buttonIcon} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

AccountAction.propTypes = {
  classes: PropTypes.object.isRequired,
  back: PropTypes.func.isRequired,
  clockIn: PropTypes.func.isRequired,
  isWorking: PropTypes.number,
  clockOut: PropTypes.func.isRequired,
  export: PropTypes.func.isRequired,
  analyze: PropTypes.func.isRequired,
  crew: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  isElectron: PropTypes.bool.isRequired,
}

export default withStyles(styles)(AccountAction)
