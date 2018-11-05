import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUModal from '@material-ui/core/Modal';

import style from './styles';

export class Modal extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MUModal open={this.props.open} onClose={this.props.toggle}>
        <div className={classes.paper}>{this.props.children}</div>
      </MUModal>
    );
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.array,
};

export default withStyles(style)(Modal);