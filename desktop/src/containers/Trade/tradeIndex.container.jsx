import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import VirtualizedSortSelect from '~/components/tables/Table'
import Progress from '~/components/helpers/Progress'

import { analyzeActions } from '~/store/actions'
import { tradeSelectors } from '~/store/selectors'

import * as TableDataTypes from '~/constants/tableDataTypes'
import { analyzeStatus } from '~/constants/analyze'
import domain from '~/constants/domains'

export class TradeIndex extends Component {
  selectLabel = (selected) => `${selected.name} selected`

  select = (object) => this.props.select(domain.TRADE, object)

  add = () => this.props.setStatus(domain.TRADE, analyzeStatus.ADDING)

  render() {
    const { trades, selected } = this.props

    if (!trades) return <Progress variant="circular" fullWidth fullHeight />

    return (
      <VirtualizedSortSelect
        data={trades || []}
        columns={rows}
        selected={selected}
        select={this.select}
        initialSortBy="name"
      />
    )
  }
}

TradeIndex.propTypes = {
  trades: PropTypes.array,
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  const filters = state.analyze.tradeFilters
  return {
    trades: tradeSelectors.getAllTradesNew(state, { filters, sorts: {} }),
    selected: tradeSelectors.getSelectedTrade(state), //error here
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeIndex)

const rows = [
  {
    id: `name`,
    dataKey: `name`,
    width: 150,
    height: 56,
    padding: `dense`,
    label: `Name`,
    type: TableDataTypes.STRING,
  },
]
