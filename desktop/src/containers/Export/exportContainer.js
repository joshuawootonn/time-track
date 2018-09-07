import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import Export from 'components/forms/Export'

class ExportContainer extends Component {
  render() {
    console.log(this.props.history.location)
    return (
      <div>
        <Export />
      </div>
    )
  }
}

export default withRouter(ExportContainer)