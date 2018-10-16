// This function loops through the entities make results for each of them and not just the parent
export const normalizeEmbeddedData = data => {
  Object.keys(data.entities).forEach(entity => {
    data.result[entity] = [];
    Object.keys(data.entities[entity]).forEach(entityId => {
      data.result[entity].push(Number(entityId));
    });
  });
  return data;
};