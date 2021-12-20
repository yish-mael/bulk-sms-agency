import * as requestFromServer from './composeMessagesCrud';
import { composeMessagesSlice, callTypes } from './composeMessagesSlice';
import helperFuncs from '../utils/helperFuncs';

const { actions } = composeMessagesSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatComposedMessagesPayload(payload);
      dispatch(
        actions.customersFetched({
          totalCount: totalDoc,
          entities: _payload,
        })
      );
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't find messages";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      return error;
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.customerFetched({ composeMessageForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatComposedMessagePayload(payload);
      dispatch(actions.customerFetched({ composeMessageForEdit: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't find composeMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const fetchMessageById = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.messageFetched({ composeMessageForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  dispatch(actions.messageFetched({ messageId: id }));
  // return requestFromServer
  //   .getCustomerById(id)
  //   .then((response) => {
  //     const { payload } = response.data;
  //     const _payload = helperFuncs.formatComposedMessagePayload(payload);
  // })
  // .catch((error) => {
  //   error.clientMessage = "Can't find composeMessage";
  //   dispatch(actions.catchError({ error, callType: callTypes.action }));
  // });
};

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomer(id)
    .then((response) => {
      dispatch(actions.customerDeleted({ id }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't delete message";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatComposedMessagePayload(payload);
      dispatch(actions.customerCreated({ composeMessage: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't create composeMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updateCustomer = (composeMessage) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(composeMessage)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatComposedMessagePayload(payload);
      dispatch(actions.customerUpdated({ composeMessage: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't update composeMessage";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updatePendingMessage = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePendingMessage(id)
    .then((response) => { 
      const { payload } = response.data;
      const _payload = helperFuncs.formatComposedMessagePayload(payload);
      dispatch(actions.customerUpdated({ composeMessage: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't update composeMessage";
      dispatch(
        actions.catchError({ error: error.message, callType: callTypes.action })
      );
      return error;
    });
};

export const deleteCustomers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomers(ids)
    .then((response) => {
      dispatch(actions.customersDeleted({ ids }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't delete compose messages";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};
