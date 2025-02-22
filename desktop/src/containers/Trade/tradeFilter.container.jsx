import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Formik } from 'formik'
import { Card } from '@material-ui/core'

import Trade from '~/components/forms/Trade'

import { analyzeActions } from '~/store/actions'

import domain from '~/constants/domains'

export class TradeFilter extends Component {
  render() {
    const {
      clearFilter,
      tradeFilters,
      tradeFilterVisible,
      updateFilter,
      toggleFilter,
    } = this.props

    if (tradeFilterVisible) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...tradeFilters,
          }}
          onSubmit={(values, formikFunctions) => {
            updateFilter({ ...values })
            toggleFilter()
            formikFunctions.resetForm()
          }}
          render={(formikProps) => {
            return (
              <Card
                style={{
                  position: `absolute`,
                  top: `70px`,
                  left: `2.5%`,
                  zIndex: 900,
                  width: `95%`,
                  minHeight: `100px`,
                }}
              >
                <Trade
                  removeTrade={this.removeTrade}
                  label="Filter"
                  type="filter"
                  clearFilter={clearFilter}
                  {...formikProps}
                />
              </Card>
            )
          }}
        />
      )
    }
    return null
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    tradeFilters: state.analyze.tradeFilters,
    tradeFilterVisible: state.analyze.tradeFilterVisible,
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filters) =>
      dispatch(analyzeActions.updateFilter(domain.TRADE, filters)),
    clearFilter: () => dispatch(analyzeActions.clearFilter(domain.TRADE)),
    toggleFilter: () => dispatch(analyzeActions.toggleFilter(domain.TRADE)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeFilter)
