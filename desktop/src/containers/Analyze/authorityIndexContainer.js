import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authorityActions,analyzeActions } from 'store/actions';
import { authoritySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import domain from 'constants/domains';

export class AuthorityIndex extends Component {
  componentDidMount = () => {
    this.props.getAllAuthorities();
  }
  
  selectLabel = selected => `${selected.type} selected`

  select = object => this.props.select(domain.AUTHORITY,object)

  render () {
    const { authorities,selected } = this.props;
    return (
      <SortSelectTable
        selectLabel={this.selectLabel}
        label="Authorities"
        tableData={authorities}
        headerData={rows}
        selected={selected}
        select={this.select}
        initialOrderBy='type'
      />
    );
  }
}

AuthorityIndex.propTypes = {
  getAllAuthorities: PropTypes.func.isRequired,
  authorities: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    authorities: authoritySelectors.getAllAuthorities(state),
    selected: authoritySelectors.getSelectedAuthority(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllAuthorities: () => {
      return dispatch(authorityActions.getAllAuthorities());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch) 
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthorityIndex);

const rows = [
  {
    id: 'type',
    padding: 'dense',
    label: 'Type',
    type: TableDataTypes.STRING
  }
];