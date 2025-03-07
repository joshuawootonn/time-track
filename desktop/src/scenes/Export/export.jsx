import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import ExportContainerCSV from '~/containers/Export/exportContainerCSV'

const styles = () => ({
  hero: {
    height: `100vh`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
  },
})

class Export extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.hero}>
        {/* this is where export container type is atm, id keep this structure for now until we know if we want to have both export files */}
        <ExportContainerCSV />
      </div>
    )
  }
}

Export.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(Export)
