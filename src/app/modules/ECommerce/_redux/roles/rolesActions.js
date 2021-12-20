import * as requestFromServer from './rolesCrud';
import { rolesSlice, callTypes } from './rolesSlice';
import helperFuncs from '../utils/helperFuncs';

const { actions } = rolesSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  console.log(queryParams)
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatRolesPayload(payload);
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
    return dispatch(actions.customerFetched({ roleForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatRolePayload(payload);
      dispatch(
        actions.customerFetched({
          roleForEdit: _payload,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find role";
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
      error.clientMessage = "Can't delete role";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatRolePayload(payload);
      dispatch(actions.customerCreated({ role: _payload }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = (role) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(role)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatRolePayload(payload);
      dispatch(actions.customerUpdated({ role: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update role";
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
