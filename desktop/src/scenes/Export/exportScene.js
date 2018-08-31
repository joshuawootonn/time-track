import React, { Component } from 'react'

import ExportContainer from 'containers/Export/exportContainer'

class ExportScene extends Component {
  render () {
    console.log("export ")
    return (
      <div>
        ExportContainer
        <ExportContainer />
      </div>
    )
  }
}

export default ExportScene