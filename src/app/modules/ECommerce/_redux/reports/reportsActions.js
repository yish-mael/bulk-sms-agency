import * as requestFromServer from './reportsCrud';
import { reportsSlice, callTypes } from './reportsSlice';
import helperFuncs from '../utils/helperFuncs';

const { actions } = reportsSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatReportsPayloadArr(payload);
      dispatch(
        actions.customersFetched({
          totalCount: totalDoc,
          entities: _payload,
        })
      );
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't find reports";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      return error;
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ reportForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.customerFetched({ reportForEdit: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't find report";
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
      error.clientMessage = "Can't delete report";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const createCustomer = (customerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCustomer(customerForCreation)
    .then((response) => {
      console.log('reportResponse', response);
      const { payload } = response.data;
      const _payload = helperFuncs.formatReportsPayloadArr([payload]);
      dispatch(actions.customerCreated({ report: _payload[0] }));
      return response;
    })
    .catch((error) => {
      console.log('reportError', error);
      error.clientMessage = "Can't create report";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updateCustomer = (report) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(report)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.customerUpdated({ report: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't update report";
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
      error.clientMessage = "Can't delete reports";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};
