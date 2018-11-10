import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authorityActions,analyzeActions } from 'store/actions';
import { authoritySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus,analyzeDomain } from 'constants/analyze';

class AuthorityIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getAuthorities();
  }
  render () {
    const { authorities,select,selected } = this.props;
    console.log(this.props);
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.type} selected`;}}
        label="Authorities"
        tableData={authorities}
        headerData={rows}
        selected={selected}
        select={object =>select(analyzeDomain.AUTHORITY,object)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    authorities: authoritySelectors.getAllAuthorities(state),
    selected: authoritySelectors.getSelectedAuthority(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthorities: () => {
      return dispatch(authorityActions.getAuthorities());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

AuthorityIndexContainer.propTypes = {
  getAuthorities: PropTypes.func.isRequired,
  authorities: PropTypes.array.isRequired,
  selectAuthority: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthorityIndexContainer);


const rows = [
  {
    id: 'type',
    numeric: false,
    padding: 'dense',
    label: 'Type',
    type: TableDataTypes.STRING
  }
];