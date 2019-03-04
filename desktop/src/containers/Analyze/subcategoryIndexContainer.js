import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analyzeActions, subcategoryActions } from 'store/actions';
import { subcategorySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

export class SubcategoryIndex extends Component {
  componentDidMount = () => {
    this.props.getAllSubcategories();
  }
  
  selectLabel = selected =>`${selected.type} selected`;

  select = object => this.props.select(domain.SUBCATEGORY,object)

  add = () => this.props.setStatus(domain.SUBCATEGORY,analyzeStatus.ADDING)

  render() {
    const { subcategories, selected } = this.props;

    return (
      <SortSelectTable
        selectLabel={this.selectLabel}
        label="SubCategories"
        tableData={subcategories}
        headerData={rows}
        selected={selected}
        select={this.select}
        add={this.add}
        initialOrderBy='type'
      />
    );
  }
}

SubcategoryIndex.propTypes = {
  getAllSubcategories: PropTypes.func.isRequired,
  subcategories: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    subcategories: subcategorySelectors.getAllSubcategories(state),
    selected: subcategorySelectors.getSelectedSubcategory(state)
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    getAllSubcategories: () => {
      return dispatch(subcategoryActions.getAllSubcategories());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryIndex);

const rows = [
  {
    id: 'type',
    padding: 'dense',
    label: 'Type',
    type: TableDataTypes.STRING
  }
];