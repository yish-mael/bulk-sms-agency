import * as requestFromServer from './usersCrud';
import { usersSlice, callTypes } from './usersSlice';
import helperFuncs from '../utils/helperFuncs';

const { actions } = usersSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatUsersPayload(payload);

      dispatch(
        actions.customersFetched({
          totalCount: totalDoc,
          entities: _payload,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatUserPayloadObj(payload);
      dispatch(actions.customerFetched({ userForEdit: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomer(id)
    .then((response) => {
      dispatch(actions.customerDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      const { payload } = response.data;

      const _payload = helperFuncs.formatUserPayloadObj(payload);

      dispatch(actions.customerCreated({ user: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = (user) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(user)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatUserPayloadObj(payload);
      dispatch(actions.customerUpdated({ user: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomers(ids, status)
    .then(() => {
      dispatch(actions.customersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update customers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteCustomers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomers(ids)
    .then((response) => {
      dispatch(actions.customersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
