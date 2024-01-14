import React, { Component } from 'react'
import { connect } from 'react-redux'
import ShiftCRUD from '~/containers/Shift/shiftCRUD.container'


class ShiftCRUDmodal extends Component {

  render() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center pt-24 pb-6">
        <div className="bg-white w-full h-full m-6 p-6 rounded shadow-lg z-50 overflow-scroll">
          <button
            onClick={this.props.onClose}
            className="float-right text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
          {/* <h2 className="text-2xl font-bold mb-4">Modal Header</h2>
          <p>Some text in the Modal..</p> */}
          <div>
            <ShiftCRUD />
          </div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   // Add your mapStateToProps logic here
// }

// const mapDispatchToProps = (dispatch) => {
  
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ShiftCRUDmodal)

export default ShiftCRUDmodal