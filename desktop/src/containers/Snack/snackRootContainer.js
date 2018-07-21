import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProjectAddModal from 'containers/Projects/addContainer';
import ProjectEditModal from 'containers/Projects/editContainer';
import ProjectDeleteModal from 'containers/Projects/deleteContainer';
import ProjectDuplicateModal from 'containers/Projects/duplicateContainer';

import Modal from 'components/wrappers/Modal';

import {modal as modalActions} from 'store/actions';
import * as actionTypes from 'constants/actionTypes';

const MODAL_COMPONENTS = {
  [actionTypes.ADD_PROJECT_MODAL]: ProjectAddModal,
  [actionTypes.EDIT_PROJECT_MODAL]: ProjectEditModal,
  [actionTypes.DELETE_PROJECT_MODAL]: ProjectDeleteModal,
  [actionTypes.DUPLICATE_PROJECT_MODAL]: ProjectDuplicateModal
  /* other modals */
}

export class SnackRootContainer extends Component {
  toggleModal = () => {
    this.props.closeModal();
  }
  render() {
    const { modalType, modalProps } = this.props;
    if (!modalType) {
      return null // after React v15 you can return null here
    }
    const SpecificModal = MODAL_COMPONENTS[modalType]
    return(
      <Modal open={true} toggle={this.toggleModal}>    
      <SpecificModal toggleModal={this.toggleModal} data={modalProps} />
    </Modal>
    )
    
  }
}

SnackRootContainer.propTypes = {
  closeModal: PropTypes.func
}

export default connect( state => state.modal ,modalActions)(SnackRootContainer)