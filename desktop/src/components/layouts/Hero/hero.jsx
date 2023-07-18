import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

export const Hero = (props) => {
  const { classes, fullPage, fullHeight, fullWidth, children } = props

  const wrapperClasses = cx({
    [classes.fullPageWrapper]: fullPage,
    [classes.fullHeight]: !fullPage && fullHeight,
    [classes.fullWidth]: !fullPage && fullWidth,
  })

  const innerClasses = cx({
    [classes.fullPageInner]: fullPage,
    [classes.fullHeight]: !fullPage && fullHeight,
    [classes.fullWidth]: !fullPage && fullWidth,
    [classes.flex]: true,
  })

  return (
    <div className={wrapperClasses}>
      <div className={innerClasses}>{children}</div>
    </div>
  )
}

Hero.defaultProps = {
  fullWidth: false,
  fullHeight: false,
  fullPage: false,
}

Hero.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullPage: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Hero)
