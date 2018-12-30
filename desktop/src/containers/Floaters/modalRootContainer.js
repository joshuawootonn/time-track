import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SettingsModalScene from 'scenes/Analyze/settings';

import { modalActions } from 'store/actions';
import { analyzeActionTypes } from 'constants/actionTypeConstants';


const MODAL_COMPONENTS = {
  [analyzeActionTypes.EDIT_SETTINGS_MODAL] : SettingsModalScene
};

export class ModalRoot extends Component {
  toggleModal = () => {
    this.props.closeModal();
  }
  render() {
    const { modalType, modalProps } = this.props;
    if (!modalType) {
      return null; // after React v15 you can return null here
    }
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return(
      <SpecificModal open={true}  toggleModal={this.toggleModal} data={modalProps} />  
    );    
  }
}

ModalRoot.propTypes = {
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  modalProps: PropTypes.object
};

/* istanbul ignore next */
const mapStateToProps = state => {  
  return state.modal;  
};

export default connect( mapStateToProps ,modalActions)(ModalRoot);