import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackContainer from 'containers/Snack/snackContainer';

import { snackActions } from 'store/actions';

export class SnackRootContainer extends Component {
  render() {
    const { snackType, snackMessage } = this.props;
    if (!snackType || !snackMessage) {
      return null;
    }
    return (
      <SnackContainer
        message={snackMessage}
        type={snackType}
        onClose={this.props.closeSnack}
      />
    );
  }
}

SnackRootContainer.propTypes = {
  closeSnack: PropTypes.func,
  snackType: PropTypes.string,
  snackMessage: PropTypes.string,
};

export default connect(
  state => state.snack,
  snackActions,
)(SnackRootContainer);
