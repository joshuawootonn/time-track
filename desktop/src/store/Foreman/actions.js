import { foremanActionTypes } from 'constants/actionTypeConstants';

export const updateFilter = projectId => {
  return { type: foremanActionTypes.UPDATE_FILTERS, projectId };
};
