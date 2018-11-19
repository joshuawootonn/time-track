import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { categoryActions,analyzeActions } from 'store/actions';
import { categorySelectors } from 'store/selectors';
import SortSelectTable from 'components/tables/SortSelect';
import * as TableDataTypes from 'constants/tableDataTypes';
import { analyzeStatus } from 'constants/analyze';
import domain from 'constants/domains';

class CategoryIndexContainer extends Component {
  componentDidMount = () => {
    this.props.getAllCategories();
  }
  render () {
    const { categories,select,selected,setStatus } = this.props;    
    return (
      <SortSelectTable
        selectLabel={selected => {return `${selected.type} selected`;}}
        label="Categories"
        tableData={categories}
        headerData={rows}
        selected={selected}
        select={object =>select(domain.CATEGORY,object)}        
        add={() => {setStatus(domain.CATEGORY,analyzeStatus.ADDING);}}
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
    getAllCategories: () => {
      return dispatch(categoryActions.getAllCategories());
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch)   
  };
};

CategoryIndexContainer.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  setStatus:PropTypes.func.isRequired
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