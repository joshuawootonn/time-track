import _ from 'lodash';
export default (state = {}, action) => {
  const { payload, deleted } = action;
  if (payload && payload.entities) {
    return _.merge({}, state, payload.entities);
  } else if (deleted && deleted.entities) {
    let temp = {};
    // Loops through entity types
    Object.keys(state).forEach(entityType => {
      // Potential entity types that need to be deleted
      const itemsToDelete = deleted.entities[entityType];
      // If there are such deletions omit them otherwise carry on
      temp[entityType] = itemsToDelete ? _.omit(state[entityType], itemsToDelete) : state[entityType];
    });
    return temp;
  }
  return state;
};
