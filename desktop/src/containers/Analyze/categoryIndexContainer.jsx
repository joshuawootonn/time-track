import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { categoryActions, analyzeActions } from '~/store/actions'
import { categorySelectors } from '~/store/selectors'
import SortSelectTable from '~/components/tables/SortSelect'
import * as TableDataTypes from '~/constants/tableDataTypes'
import { analyzeStatus } from '~/constants/analyze'
import domain from '~/constants/domains'

export class CategoryIndex extends Component {
  componentDidMount = () => {
    this.props.getAllCategories()
  }

  selectLabel = (selected) => `${selected.type} selected`

  select = (object) => this.props.select(domain.CATEGORY, object)

  add = () => this.props.setStatus(domain.CATEGORY, analyzeStatus.ADDING)

  render() {
    const { categories, selected } = this.props
    return (
      <SortSelectTable
        selectLabel={this.selectLabel}
        label="Categories"
        tableData={categories}
        headerData={rows}
        selected={selected}
        select={this.select}
        add={this.add}
        initialOrderBy="type"
      />
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    categories: categorySelectors.getAllCategories(state),
    selected: categorySelectors.getSelectedCategory(state),
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => {
      return dispatch(categoryActions.getAllCategories())
    },
    ...bindActionCreators({ ...analyzeActions }, dispatch),
  }
}

CategoryIndex.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  setStatus: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex)

const rows = [
  {
    id: `type`,
    padding: `dense`,
    label: `Type`,
    type: TableDataTypes.STRING,
  },
]
