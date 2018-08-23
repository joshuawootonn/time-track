import React, { Component } from 'react';

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

export default ClockOutScene;
