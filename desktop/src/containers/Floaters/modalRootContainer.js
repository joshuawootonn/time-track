import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'components/floaters/Modal';

import AuthorityEditContainer from 'containers/Analyze/authorityEditContainer';
import CrewEditContainer from 'containers/Analyze/crewEditContainer';

import { modalActions } from 'store/actions';
import {authorityActionTypes, crewActionTypes} from 'constants/ActionTypes';

const MODAL_COMPONENTS = {
  [authorityActionTypes.EDIT_AUTHORITIES_MODAL] : AuthorityEditContainer,
  [crewActionTypes.EDIT_CREWS_MODAL] : CrewEditContainer
  /* other modals */
};

export class RootModalContainer extends Component {
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
      <Modal open={true} toggle={this.toggleModal}>  
        <SpecificModal toggleModal={this.toggleModal} data={modalProps} />
      </Modal>
    );
    
  }
}

RootModalContainer.propTypes = {
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  modalProps: PropTypes.object
};

const mapStateToProps = state => {
  /* istanbul ignore next */
  return state.modal;  
};

export default connect( mapStateToProps ,modalActions)(RootModalContainer);