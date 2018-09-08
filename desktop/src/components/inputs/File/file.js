import React, { Component } from 'react'

import { Button } from '@material-ui/core'

class File extends Component {
  render() {
    return (
      <div>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" >
            Select File
                 </Button>
        </label>
      </div>
    )
  }
}

export default File