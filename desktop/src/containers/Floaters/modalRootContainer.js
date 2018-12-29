import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthorityModalContainer from 'containers/Analyze/authorityModalContainer';
import CrewModalContainer from 'containers/Analyze/crewModalContainer';
import CategoryModalContainer from 'containers/Analyze/categoryModalContainer';
import SettingsModalContainer from 'containers/Analyze/settingsModalContainer';

import { modalActions } from 'store/actions';
import { authorityActionTypes, crewActionTypes, categoryActionTypes, analyzeActionTypes } from 'constants/actionTypeConstants';


const MODAL_COMPONENTS = {
  [authorityActionTypes.EDIT_AUTHORITIES_MODAL] : AuthorityModalContainer,
  [crewActionTypes.EDIT_CREWS_MODAL] : CrewModalContainer,
  [categoryActionTypes.EDIT_CATEGORIES_MODAL] : CategoryModalContainer,
  [analyzeActionTypes.EDIT_SETTINGS_MODAL] : SettingsModalContainer
  /* other modals */
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