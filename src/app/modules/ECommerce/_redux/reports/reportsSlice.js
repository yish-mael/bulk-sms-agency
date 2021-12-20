import { createSlice } from '@reduxjs/toolkit';

const initialReportsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  reportForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState: initialReportsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getReportById
    customerFetched: (state, action) => {
      state.actionsLoading = false;
      state.reportForEdit = action.payload.reportForEdit;
      state.error = null;
    },
    // findReports
    customersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createReport
    customerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if (state.entities === null) {
        state.entities = [];
      }
      state.entities.push(action.payload.report);
    },
    // updateReport
    customerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.report.id) {
          return action.payload.report;
        }
        return entity;
      });
    },
    // deleteReport
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteReports
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
