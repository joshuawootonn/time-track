import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackContainer from 'containers/Floaters/snackContainer';

import { snackActions } from 'store/actions';

export class SnackRoot extends Component {
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

SnackRoot.propTypes = {
  closeSnack: PropTypes.func,
  snackType: PropTypes.string,
  snackMessage: PropTypes.string
};

/* istanbul ignore next */
const mapStateToProps = state => {  
  return state.snack;  
};

export default connect(mapStateToProps,snackActions)(SnackRoot);
