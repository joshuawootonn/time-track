import { tradeActionTypes } from '~/constants/actionTypeConstants'
import { snackActions, genericActions, analyzeActions } from '~/store/actions'
import * as status from '~/constants/status'
import domains from '~/constants/domains'

export const getAllTrades = () => {
  return async (dispatch) => {
    return dispatch(genericActions.getAll(domains.TRADE))
  }
}

export const createTrade = (trade) => {
  return async (dispatch) => {
    dispatch({ type: tradeActionTypes.CREATE_TRADE_REQUEST })
    try {
      await dispatch(genericActions.post(domains.TRADE, trade))
      await dispatch(snackActions.openSnack(status.SUCCESS, `Trade Created`))
      return dispatch({ type: tradeActionTypes.CREATE_TRADE_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Trade Creation Failed`),
      )
      return dispatch({ type: tradeActionTypes.CREATE_TRADE_FAILURE })
    }
  }
}

export const updateTrade = (trade) => {
  return async (dispatch) => {
    dispatch({ type: tradeActionTypes.UPDATE_TRADE_REQUEST })
    try {
      await dispatch(genericActions.put(domains.TRADE, trade))
      await dispatch(snackActions.openSnack(status.SUCCESS, `Trade Updated`))
      return dispatch({ type: tradeActionTypes.UPDATE_TRADE_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Trade Update Failed`),
      )
      return dispatch({ type: tradeActionTypes.UPDATE_TRADE_FAILURE })
    }
  }
}

export const removeTrade = (id) => {
  return async (dispatch) => {
    dispatch({ type: tradeActionTypes.REMOVE_TRADE_REQUEST })
    try {
      await dispatch(analyzeActions.deleteSelected(domains.TRADE))
      await dispatch(genericActions.delet(domains.TRADE, id))

      await dispatch(snackActions.openSnack(status.SUCCESS, `Trade Deleted`))
      return dispatch({ type: tradeActionTypes.REMOVE_TRADE_SUCCESS })
    } catch (e) {
      await dispatch(
        snackActions.openSnack(status.SUCCESS, `Trade Deletion Failed`),
      )
      return dispatch({ type: tradeActionTypes.REMOVE_TRADE_FAILURE })
    }
  }
}
