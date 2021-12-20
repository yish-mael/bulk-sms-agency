import { createSlice } from '@reduxjs/toolkit';

const initialComposeMessagesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  composeMessageForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const composeMessagesSlice = createSlice({
  name: 'composeMessages',
  initialState: initialComposeMessagesState,
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
    // asyncGetComposeMessageById
    customerFetched: (state, action) => {
      state.actionsLoading = false;
      state.composeMessageForEdit = action.payload.composeMessageForEdit;
      state.error = null;
    },
    // getComposeMessageById
    messageFetched: (state, action) => {
      state.actionsLoading = false;
      state.composeMessageForEdit =
        state.entities &&
        state.entities.length > 0 &&
        state.entities.find((entity) => entity.id === action.payload.messageId);
      state.error = null;
    },
    // findComposeMessages
    customersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createComposeMessage
    customerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if (state.entities === null) {
        state.entities = [];
      }
      state.entities.push(action.payload.composeMessage);
    },
    // updateComposeMessage
    customerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.id === action.payload.composeMessage.id) {
          return action.payload.composeMessage;
        }
        return entity;
      });
    },
    // deleteComposeMessage
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    // deleteComposeMessages
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
