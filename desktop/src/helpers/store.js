// This function loops through the entities make results for each of them and not just the parent
export const normalizeEmbeddedData = (data) => {
  // loop through all the entity types
  Object.keys(data.entities).forEach((entity) => {
    data.result[entity] = []
    // loop through the keys of those types and create the resulting results array
    Object.keys(data.entities[entity]).forEach((entityId) => {
      data.result[entity].push(Number(entityId))
    })
  })
  return data
}
