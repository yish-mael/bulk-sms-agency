import helperFuncs from '../utils/helperFuncs';
import * as requestFromServer from './activitiesCrud';
import { activitiesSlice, callTypes } from './activitiesSlice';

const { actions } = activitiesSlice;

export const fetchCustomers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCustomers(queryParams)
    .then((response) => {

      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatActivitiesPayload(payload);
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
      error.clientMessage = "Can't find activities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
      return error;
    });
};

export const fetchCustomer = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.customerFetched({ activityForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCustomerById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(
        actions.customerFetched({ activityForEdit: { ..._payload, credit: 0 } })
      );
     return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't find activity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCustomer(id)
    .then((response) => {
      console.log('DeletedActivityResponse', response);
      dispatch(actions.customerDeleted({ id }));
      return response;
    })
    .catch((error) => {
      console.log('DeletedActivityError', error);
      error.clientMessage = "Can't delete activity";
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
      const _payload = helperFuncs.formatPayloadObj(payload);

      dispatch(actions.customerCreated({ activity: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't create activity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updateCustomer = (activity) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCustomer(activity)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.customerUpdated({ activity: _payload }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't update activity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};

export const updateCustomersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCustomers(ids, status)
    .then((response) => {
      dispatch(actions.customersStatusUpdated({ ids, status }));
      return response;
    })
    .catch((error) => {
      error.clientMessage = "Can't update activities status";
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
      error.clientMessage = "Can't delete activities";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      return error;
    });
};
