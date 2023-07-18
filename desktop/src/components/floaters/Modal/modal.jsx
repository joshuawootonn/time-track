import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUModal from '@material-ui/core/Modal';
import cx from 'classnames';

import style from './styles';

export class Modal extends Component {
  render() {
    const { classes, className } = this.props;

    return (
      <MUModal open={this.props.open} onClose={this.props.toggle}>
        <div className={cx(className, classes.paper)}>
          {this.props.children}
        </div>
      </MUModal>
    );
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(style)(Modal);
