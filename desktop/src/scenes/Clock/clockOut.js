import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ClockOutContainer from 'containers/Clock/clockOutContainer';

class ClockOut extends Component {
  render() {
    return <ClockOutContainer type={this.props.type} />;
  }
}

ClockOut.propTypes = {
  type: PropTypes.string.isRequired
};

export default ClockOut;
