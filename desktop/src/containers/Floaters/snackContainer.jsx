import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Check, Error } from '@material-ui/icons'

import * as status from '~/constants/status'
import Snack from '~/components/floaters/Snack'

export class SnackContainer extends Component {
  render() {
    const { message, type, onClose } = this.props

    const position = { vertical: `bottom`, horizontal: `right` }

    let icon
    switch (type) {
      case status.SUCCESS:
        icon = <Check />
        break
      case status.FAILURE:
        icon = <Error />
        break
      default:
        icon = null
        break
    }

    return (
      <Snack
        position={position}
        type={type}
        onClose={onClose}
        icon={icon}
        message={message}
      />
    )
  }
}

SnackContainer.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func,
}

export default SnackContainer
