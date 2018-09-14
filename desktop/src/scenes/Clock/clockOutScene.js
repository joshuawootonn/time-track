import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ClockOutContainer from 'containers/Clock/clockOutContainer';

class ClockOutScene extends Component {
  render() {
    return (
      <div>
        <ClockOutContainer type={this.props.type} />
      </div>
    );
  }
}

ClockOutScene.propTypes = {
  type: PropTypes.string.isRequired
};

export default ClockOutScene;
