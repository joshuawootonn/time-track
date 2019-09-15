export const mapEmployeeItemsToOptions = items => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.map(item => {
    return {
      label: item.firstName + ` ` + item.lastName,
      value: item.firstName + ` ` + item.lastName,
      id: item.id,
      data: { ...item }
    };
  });
};

export const mapProjectItemsToOptions = items => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.map(item => {
    return {
      label: item.name,
      value: item.name,
      id: item.id,
      data: { ...item }
    };
  });
};

export const mapProjectTaskItemsToOptions = items => {
  console.log(items);
  if (!items || items.length === 0) {
    return [];
  }
  return items.map(item => {
    return {
      label: item.task.name,
      value: item.task.name,
      id: item.id,
      data: { ...item }
    };
  });
};
