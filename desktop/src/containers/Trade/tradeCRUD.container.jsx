import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import Hero from '~/components/layouts/Hero'
import Trade from '~/components/forms/Trade'

import { tradeSelectors } from '~/store/selectors'
import { tradeActions } from '~/store/actions'

import { analyzeStatus } from '~/constants/analyze'
import { tradeValidation } from '~/constants/formValidation'

export class TradeCRUD extends Component {
  removeTrade = () => {
    const { selected, removeTrade } = this.props
    removeTrade(selected.id)
  }
  render() {
    const { status, selected } = this.props

    if (status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Trade.. </Typography>
        </Hero>
      )
    }

    if (status === analyzeStatus.ADDING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            name: ``,
          }}
          validationSchema={tradeValidation}
          onSubmit={(values, formikFunctions) => {
            const { createTrade } = this.props
            return createTrade({
              name: values.name,
            }).then(
              () => {
                formikFunctions.resetForm()
                formikFunctions.setStatus({ success: true })
              },
              (e) => {
                formikFunctions.setStatus({ success: false })
                formikFunctions.setSubmitting(false)
                formikFunctions.setErrors({ submit: e })
              },
            )
          }}
          render={(formikProps) => {
            return <Trade label="Add" type="add" {...formikProps} />
          }}
        />
      )
    }

    if (status === analyzeStatus.EDITING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected,
          }}
          validationSchema={tradeValidation}
          onSubmit={(values, formikFunctions) => {
            const { updateTrade } = this.props
            return updateTrade({
              id: values.id,
              name: values.name,
            }).then(
              () => {
                formikFunctions.resetForm()
                formikFunctions.setStatus({ success: true })
              },
              (e) => {
                formikFunctions.setStatus({ success: false })
                formikFunctions.setSubmitting(false)
                formikFunctions.setErrors({ submit: e })
              },
            )
          }}
          render={(formikProps) => {
            return (
              <Trade
                removeTrade={this.removeTrade}
                label="Edit"
                type="edit"
                {...formikProps}
              />
            )
          }}
        />
      )
    }
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    selected: tradeSelectors.getSelectedTrade(state),
    status: state.analyze.tradeStatus,
  }
}

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => {
  return {
    createTrade: (trade) => {
      return dispatch(tradeActions.createTrade(trade))
    },
    updateTrade: (trade) => {
      return dispatch(tradeActions.updateTrade(trade))
    },
    removeTrade: (id) => {
      return dispatch(tradeActions.removeTrade(id))
    },
  }
}

TradeCRUD.propTypes = {
  status: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeCRUD)
