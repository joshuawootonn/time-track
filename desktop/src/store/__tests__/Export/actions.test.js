import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { exportActionTypes,snackActionTypes } from 'constants/actionTypeConstants';
import { compareActionTypes } from 'helpers/test.helper';
import { exportToExcel,getData,formatData } from 'store/Export/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('Export actions', () => {
  beforeEach(() => {
    store.clearActions();    
  });
  // it('exportToExcel shouldn\'t work', async () => {
  //   const expectedActionType = [exportActionTypes.EXPORT_EXCEL_REQUEST,exportActionTypes.EXPORT_EXCEL_FAILURE,snackActionTypes.SHOW_SNACK];
    
  //   await compareActionTypes(expectedActionType,store, exportToExcel(null,new Date(),'C:/'));
  // });
  it('exportToExcel should work', async () => {
    const expectedActionType = [exportActionTypes.EXPORT_EXCEL_REQUEST,exportActionTypes.EXPORT_EXCEL_SUCCESS,snackActionTypes.SHOW_SNACK];
    
    await compareActionTypes(expectedActionType,store, exportToExcel(null,new Date(),'C:/'));
  });
});