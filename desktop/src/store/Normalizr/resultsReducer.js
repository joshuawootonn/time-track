import _ from 'lodash';

export const payloadCustomizer = (objValue, srcValue) => {
  // console.log(objValue,srcValue)
  if (_.isArray(objValue)) {
    return arrayUnique(objValue.concat(srcValue));
  }
};

export const arrayUnique = array => {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
};


export default (state = {}, action) => {
  const { payload, deleted } = action;
  if (payload && payload.result) {
    return _.mergeWith({}, state, payload.result, payloadCustomizer);
  } else if (deleted && deleted.result) {
    let temp = {};
    // Loop through result types
    Object.keys(state).forEach(resultType => {
      const itemsToDelete = deleted.result[resultType];
      // If there are such deletions get the difference of the state and items to delete
      temp[resultType] = itemsToDelete ? _.difference(state[resultType], itemsToDelete) : state[resultType];
    });
    return temp;
  }
  return state;
};
