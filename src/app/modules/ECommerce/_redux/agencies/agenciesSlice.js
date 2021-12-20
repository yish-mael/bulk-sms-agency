import { createSlice } from '@reduxjs/toolkit';

const initialAgenciesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  agencyForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const agenciesSlice = createSlice({
  name: 'agencies',
  initialState: initialAgenciesState,
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
    // getAgencyById
    customerFetched: (state, action) => {
      state.actionsLoading = false;
      state.agencyForEdit = action.payload.agencyForEdit;
      state.error = null;
    },
    // findAgencies
    customersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAgency
    customerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if (state.entities === null) {
        state.entities = [];
      }
      state.entities.push(action.payload.agency);
    },
    // updateAgency
    customerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.agency.id) {
          return action.payload.agency;
        }
        return entity;
      });
    },
    // deleteAgency
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteAgencies
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
    // agenciesUpdateState
    customersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
