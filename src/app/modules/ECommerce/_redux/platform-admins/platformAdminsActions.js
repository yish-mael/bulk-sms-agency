import * as requestFromServer from './platformAdminsCrud';
import { platformAdminsSlice, callTypes } from './platformAdminsSlice';
import helperFuncs from '../utils/helperFuncs';

const { actions } = platformAdminsSlice;

export const fetchProducts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProducts(queryParams)
    .then((response) => {
      // const { totalCount, entities } = response.data;
      const { payload, totalDoc } = response.data;
      const _payload = helperFuncs.formatPayloadArr(payload);
      dispatch(
        actions.productsFetched({
          totalCount: totalDoc,
          entities: _payload,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find admins";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchProduct = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.productFetched({ platformAdminForEdit: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProductById(id)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.productFetched({ platformAdminForEdit: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find admin";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProduct(id)
    .then((response) => {
      dispatch(actions.productDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete admin";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createProduct = (productForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createProduct(productForCreation)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.productCreated({ platformAdmin: _payload }));
    })
    .catch((error) => {
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProduct = (platformAdmin) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProduct(platformAdmin)
    .then((response) => {
      const { payload } = response.data;
      const _payload = helperFuncs.formatPayloadObj(payload);
      dispatch(actions.productUpdated({ platformAdmin: _payload }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update admin";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateProductsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForProducts(ids, status)
    .then(() => {
      dispatch(actions.productsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update admins status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteProducts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProducts(ids)
    .then((response) => {
      dispatch(actions.productsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete admins";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
