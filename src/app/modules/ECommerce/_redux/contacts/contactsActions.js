import * as requestFromServer from './contactsCrud';
import { contactsSlice, callTypes } from './contactsSlice';
import helperFuncs from '../utils/helperFuncs';

const { actions } = contactsSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatPayloadArr(payload);
      dispatch(
        actions.customersFetched({
          totalCount: totalDoc,
          entities: _payload,
        })
      );
      return response;
    })
    .catch((error) => {
      console.log(error)
      error.clientMessage = "Can't find contacts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      return error;
    });
};

export const unPaginatedfetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatPayloadArr(payload);
      dispatch(
        actions.unpaginatedCustomersFetched({
          totalCount: totalDoc,
          entities: _payload,
        })
      );
      return response;
    })
    .catch((error) => {
      console.log(error)
      error.clientMessage = "Can't find contacts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      return error;
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ contactForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.customerFetched({ contactForEdit: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
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
      error.clientMessage = "Can't delete contact";
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

      const _payload = helperFuncs.formatPayloadArr(payload);
      dispatch(actions.customerCreated({ contact: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't create contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updateCustomer = (contact) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(contact)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.customerUpdated({ contact: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't update contact";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
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
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};
