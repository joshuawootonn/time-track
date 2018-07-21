import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackContainer from 'containers/Snack/snackContainer'
import { Snackbar } from '@material-ui/core';

import { snack as snackActions } from 'store/actions';
import {shift as shiftActionTypes} from 'constants/ActionTypes';

export class SnackRootContainer extends Component {
 
  render() {
    const { snackType, snackMessage } = this.props;
    if (!snackType || !snackMessage) {
      return null 
    }
    
    return (
      <SnackContainer message={snackMessage} type={snackType} onClose={this.props.closeSnack}/>
    )
  }
}

SnackRootContainer.propTypes = {
  closeModal: PropTypes.func
}

export default connect(state => state.snack, snackActions)(SnackRootContainer)