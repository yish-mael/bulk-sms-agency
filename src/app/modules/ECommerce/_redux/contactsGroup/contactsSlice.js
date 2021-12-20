import { createSlice } from '@reduxjs/toolkit';

const initialContactsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  contactForEdit: undefined,
  lastError: null,
  allContactGroups:[],
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const contactsGroupSlice = createSlice({
  name: 'contactsGroup',
  initialState: initialContactsState,
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
    // getContactById
    customerFetched: (state, action) => {
      state.actionsLoading = false;
      state.contactForEdit = action.payload.contactForEdit;
      state.error = null;
    },
    // findContacts
    customersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    unPaginatedCustomersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.allContactGroups = entities;
      state.totalCount = totalCount;
    },
    // createContact
    customerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if (state.entities === null) {
        state.entities = [];
      }
      state.entities.unshift(action.payload.contact);
    },
    // updateContact
    customerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.contact.id) {
          return action.payload.contact;
        }
        return entity;
      });
    },
    // deleteContact
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteContacts
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
