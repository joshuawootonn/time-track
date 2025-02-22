import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AnalyzeToolbar from '~/components/tables/Toolbar'

import { analyzeActions } from '~/store/actions'
import { tradeSelectors } from '~/store/selectors'

import { analyzeStatus } from '~/constants/analyze'
import domain from '~/constants/domains'

export class TradeToolbar extends Component {
  selectLabel = (selected) => `${selected.name} selected`

  add = () => {
    const { selected, select, setStatus } = this.props
    if (selected && selected.id) {
      select(domain.TRADE, selected.id)
    }
    setStatus(domain.TRADE, analyzeStatus.ADDING)
  }

  render() {
    const { selected, toggleTradeFilter, tradeFilterVisible } = this.props

    return (
      <AnalyzeToolbar
        selectLabel={this.selectLabel}
        label="Trades"
        add={this.add}
        selected={selected}
        toggleFilter={toggleTradeFilter}
        isFilterVisible={tradeFilterVisible}
      />
    )
  }
}

TradeToolbar.propTypes = {
  selected: PropTypes.object,
  select: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  toggleTradeFilter: PropTypes.func,
  tradeFilterVisible: PropTypes.bool,
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    tradeFilterVisible: state.analyze.tradeFilterVisible,
    trades: tradeSelectors.getAllTradesWithContent(state),
    selected: tradeSelectors.getSelectedTrade(state),
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...analyzeActions }, dispatch),
    toggleTradeFilter: () =>
      dispatch(analyzeActions.toggleFilter(domain.TRADE)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeToolbar)
