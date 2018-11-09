import { createCustomActionTypes,createCRUDActionTypes } from 'helpers/actionTypes';

export default {
  ...{ ...createCRUDActionTypes('shift') },
  ...{ ...createCustomActionTypes('shift','create') },
  ...{ ...createCustomActionTypes('shift','remove') },
  ...{ ...createCustomActionTypes('shift','edit') }, 
  ...{ ...createCustomActionTypes('current_shift','get') },  
  ...{ ...createCustomActionTypes('shifts_in_range','get') }
};