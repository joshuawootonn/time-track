import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authorityActions,analyzeActions, subcategoryActions } from 'store/actions';
import { authoritySelectors, subcategorySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';

class AuthorityIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getSubcategories();
  }
  render () {
    const { subcategories,selectSubcategory,selected } = this.props;
    console.log(subcategories);
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.type} selected`;}}
        label="SubCategories"
        tableData={subcategories}
        headerData={rows}
        selected={selected}
        select={selectSubcategory}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    subcategories: subcategorySelectors.getAllSubcategories(state),
    selected: subcategorySelectors.getSelectedSubcategory(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSubcategories: () => {
      return dispatch(subcategoryActions.getSubcategories());
    },
    selectSubcategory: authority => {
      return dispatch(analyzeActions.selectSubcategory(authority));
    },
    setSubcategoryStatus: status => {
      return dispatch(analyzeActions.setSubcategoryStatus(status));
    }
  };
};

AuthorityIndexContainer.propTypes = {
  getSubcategories: PropTypes.func.isRequired,
  subcategories: PropTypes.array.isRequired,
  selectSubcategory: PropTypes.func.isRequired,
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