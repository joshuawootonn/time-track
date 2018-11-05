import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { categoryActions,analyzeActions } from 'store/actions';
import { categorySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import * as analyzeStatus from 'constants/analyze';

class CategoryIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getCategories();
  }
  render () {
    const { categories,selectCategory,selected,setCategoryStatus } = this.props;    
    console.log(categories);
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.type} selected`;}}
        label="Categories"
        tableData={categories}
        headerData={rows}
        selected={selected}
        select={selectCategory}        
        add={() => {setCategoryStatus(analyzeStatus.ADDING);}}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: categorySelectors.getAllCategories(state),
    selected: categorySelectors.getSelectedCategory(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => {
      return dispatch(categoryActions.getCategories());
    },
    selectCategory: category => {
      return dispatch(analyzeActions.selectCategory(category));
    },
    setCategoryStatus: status => {
      return dispatch(analyzeActions.setCategoryStatus(status));
    }
  };
};

CategoryIndexContainer.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  selectCategory: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  setCategoryStatus:PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(CategoryIndexContainer);


const rows = [
  {
    id: 'type',
    numeric: false,
    padding: 'dense',
    label: 'Type',
    type: TableDataTypes.STRING
  }
];