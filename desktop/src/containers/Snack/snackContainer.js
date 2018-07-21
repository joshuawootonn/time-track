import React, { Component } from 'react'

import { Check, Error } from '@material-ui/icons'

import * as status from 'constants/status';
import Snack from 'components/floaters/Snack';


class SnackContainer extends Component {
  render() {
    const { classes, message, type, onClose } = this.props;

    const position = { vertical: 'bottom', horizontal: "right" };
  
    let icon;
    switch (type) {
      case status.SUCCESS:
        icon = <Check />
        break;
      case status.FAILURE:
        icon = <Error />
        break
      default:
        icon = null;
        break;
    }



    return (<Snack
      position={position}
      type={type}
      onClose={onClose}
      icon={icon}
      message={message} />)

  }
}


export default SnackContainer;