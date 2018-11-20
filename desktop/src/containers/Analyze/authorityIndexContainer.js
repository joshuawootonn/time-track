import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { analyzeActions } from 'store/actions';
import { getAllAuthorities } from 'store/Authority/actions';
import { authoritySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import domain from 'constants/domains';

class AuthorityIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getAllAuthorities();
  }
  render () {
    const { authorities,select,selected } = this.props;
  
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.type} selected`;}}
        label="Authorities"
        tableData={authorities}
        headerData={rows}
        selected={selected}
        select={object =>select(domain.AUTHORITY,object)}
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

AuthorityIndexContainer.propTypes = {
  getAllAuthorities: PropTypes.func.isRequired,
  authorities: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

export default connect(mapStateToProps,
  { getAllAuthorities, ...analyzeActions })(AuthorityIndexContainer);


const rows = [
  {
    id: 'type',
    numeric: false,
    padding: 'dense',
    label: 'Type',
    type: TableDataTypes.STRING
  }
];