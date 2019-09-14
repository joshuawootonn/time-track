export const transformItemsToOptions = items => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.map(item => {
    if (item.name) {
      return { label: item.name, value: item.name, id: item.id };
    }
    if (item.type) {
      return { label: item.type, value: item.type, id: item.id };
    }
    if (
      item.firstName ||
      (item.firstName === '' && item.lastName) ||
      item.lastName === ''
    ) {
      return {
        label: item.firstName + ` ` + item.lastName,
        value: item.firstName + ` ` + item.lastName,
        id: item.id
      };
    }
  });
};
