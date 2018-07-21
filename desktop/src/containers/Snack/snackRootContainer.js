import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackContainer from 'containers/Snack/snackContainer'
import { Snackbar } from '@material-ui/core';

import { snack as snackActions } from 'store/actions';
import {shift as shiftActionTypes} from 'constants/ActionTypes';

const SNACK_COMPONENTS = {
  [shiftActionTypes.SHIFT_CLOCKIN_SNACK]: SnackContainer,
  /* other modals */
}

export class SnackRootContainer extends Component {
  closeSnack = () => {
    this.props.closeSnack();
  }
  render() {
    const { snackType, snackProps } = this.props;
    console.log("root", this.props)
    if (!snackType) {
      return null // after React v15 you can return null here
    }
    console.log("root", "real reander")
    const SpecificSnack = SNACK_COMPONENTS[snackType]
    return (
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: "right" }} open={true} onClose={this.closeSnack} >
         <SpecificSnack data={snackProps} closeSnack={this.closeSnack}/> 
      </Snackbar>
    )

  }
}

SnackRootContainer.propTypes = {
  closeModal: PropTypes.func
}

export default connect(state => state.snack, snackActions)(SnackRootContainer)