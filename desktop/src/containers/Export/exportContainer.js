import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class ExportContainer extends Component {
  render () {
    console.log(this.props.history.location)
    return (
      <div>
        
      </div>
    )
  }
}

export default withRouter(ExportContainer)