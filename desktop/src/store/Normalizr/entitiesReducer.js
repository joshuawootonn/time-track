import _ from 'lodash'

export const payloadCustomizer = (objValue, srcValue) => {
  // this makes sub arrays in objects take the new values and ignore the existing
  if (_.isArray(srcValue)) {
    return srcValue
  }
}

export default (state = {}, action) => {
  const { payload, deleted } = action
  if (payload && payload.entities) {
    return _.mergeWith({}, state, payload.entities, payloadCustomizer)
  } else if (deleted && deleted.entities) {
    const temp = {}
    // Loops through entity types
    Object.keys(state).forEach((entityType) => {
      // Potential entity types that need to be deleted
      const itemsToDelete = deleted.entities[entityType]
      // If there are such deletions omit them otherwise carry on
      temp[entityType] = itemsToDelete
        ? _.omit(state[entityType], itemsToDelete)
        : state[entityType]
    })
    return temp
  }
  return state
}
