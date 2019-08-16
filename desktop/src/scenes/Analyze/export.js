import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Modal from 'components/floaters/Modal';
import ExportContainer from 'containers/Analyze/exportContainer';



/* istanbul ignore next */
const styles = theme => ({
  modal: {
    width: `90%`,
    maxWidth: `500px`,
    height: `300px`,
    maxHeight: `90%`
  },
  listWrapper: {
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `center`
  },
  container: {
    height: `100%`
  },
  tab: {
    height: `100%`,
    display: `none`
  },
  index: {
    minWidth: `260px`
  },
  detail: {
    minWidth: `400px`
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  visible: {
    display: `flex`
  }
});

export class Export extends Component {
  render() {
    const { classes, open, toggleModal } = this.props;

    return (
      <Modal className={classes.modal} open={open} toggle={toggleModal}>
        <ExportContainer toggleModal={toggleModal} />
      </Modal>
    );
  }
}

Export.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};


export default withStyles(styles)(Export);
