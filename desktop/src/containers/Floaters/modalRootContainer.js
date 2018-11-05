import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from 'components/floaters/Modal';

import AuthorityModalContainer from 'containers/Analyze/authorityModalContainer';
import CrewModalContainer from 'containers/Analyze/crewModalContainer';
import CategoryModalContainer from 'containers/Analyze/categoryModalContainer';

import { modalActions } from 'store/actions';
import { authorityActionTypes, crewActionTypes, categoryActionTypes } from 'constants/ActionTypes';


const MODAL_COMPONENTS = {
  [authorityActionTypes.EDIT_AUTHORITIES_MODAL] : AuthorityModalContainer,
  [crewActionTypes.EDIT_CREWS_MODAL] : CrewModalContainer,
  [categoryActionTypes.EDIT_CATEGORIES_MODAL] : CategoryModalContainer
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