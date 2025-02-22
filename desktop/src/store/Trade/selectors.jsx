import { createSelector } from 'reselect'
import { getAnalyzeState } from '~/store/Analyze/selectors'

export const getTradesFromEntities = (state) => state.entities.trades
export const getTradesFromResults = (state) => state.results.trades

export const getAllTrades = createSelector(
  //might not need this at all
  getTradesFromEntities,
  getTradesFromResults,
  (trades, results) => {
    if (!results || results.length === 0) return null
    return results
      .map((tradeId) => {
        return trades[tradeId]
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
  },
)

export const getAllTradesNew = createSelector(
  getTradesFromEntities,
  getTradesFromResults,
  (_, props) => (props ? props.sorts : null),
  (_, props) => (props ? props.filters : null),
  (trades, results, sorts, filters) => {
    if (!results || results.length === 0) return null
    let list = results.map((tradeId) => {
      const trade = trades[tradeId]
      return {
        ...trade,
      }
    })

    if (sorts) {
      list = list.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
    }

    if (filters) {
      list = list.filter((trade) => {
        let decision = true
        Object.keys(filters).forEach((key) => {
          if (
            key === `name` &&
            filters[key] !== `` &&
            !new RegExp(`^${filters[key]}`, `i`).test(`${trade[key]}`)
          ) {
            decision = false
          }
          if (key === `isActive` && !!trade[key] !== !!filters[key]) {
            decision = false
          }
        })
        return decision
      })
    }
    return list
  },
)

export const getAllTradesWithContent = createSelector(
  getTradesFromEntities,
  getTradesFromResults,
  (trades, results) => {
    if (!results || results.length === 0) return null
    return results
      .map((tradeId) => {
        const trade = trades[tradeId]

        return {
          ...trade,
        }
      })
      .sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
  },
)

export const getAllTradeObjects = createSelector(
  getAllTradesWithContent,
  (trades) => {
    // if the trade array is empty
    if (!trades) return null
    // reduce the trade array to a object with id as they key
    return Object.assign(
      {},
      ...trades.map((object) => ({ [object.id]: object })),
    )
  },
)

export const getSelectedTrade = createSelector(
  getTradesFromEntities,
  getAnalyzeState,
  (trades, analyze) => {
    if (analyze.trade === -1) return {}
    else {
      const temp = trades[analyze.trade]
      return {
        ...temp,
      }
    }
  },
)
