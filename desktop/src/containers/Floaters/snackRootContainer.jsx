import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackContainer from '~/containers/Floaters/snackContainer';
import { snackActions } from '~/store/actions';
import isElectron from '~/helpers/IsElectron';

export class SnackRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: null,
      isElectron: isElectron()
    };
  }
  componentDidMount() {
    if (this.state.isElectron) {
      window.electronAPI.message(function(event, message) {
        this.setState({ notification: message });
        setTimeout(this.setState({ notification: null }), 2000);
      });
    }
  }
  render() {
    const { snackType, snackMessage } = this.props;
    const { notification } = this.state;
    if (notification) {
      return <SnackContainer message={notification} type="initial" />;
    }
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

export default connect(mapStateToProps, snackActions)(SnackRoot);
