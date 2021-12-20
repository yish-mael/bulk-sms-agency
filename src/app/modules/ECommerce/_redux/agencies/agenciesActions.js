import helperFuncs from '../utils/helperFuncs';
import * as requestFromServer from './agenciesCrud';
import { agenciesSlice, callTypes } from './agenciesSlice';
import {actions as authActions} from '../../../Auth/_redux/authRedux';

const { actions } = agenciesSlice;

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
      
    })
    .catch((error) => {
      error.clientMessage = "Can't find agencies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ agencyForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      // const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(
        actions.customerFetched({ agencyForEdit: { ...payload } })
      );
      dispatch(
        authActions.updateDepartment(payload)
      )
    })
    .catch((error) => {
      error.clientMessage = "Can't find agency";
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
      error.clientMessage = "Can't delete agency";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);

      dispatch(actions.customerCreated({ agency: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create agency";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateCustomer = (agency) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(agency)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.customerUpdated({ agency: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update agency";
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
    .then(() => {
      dispatch(actions.customersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete customers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
