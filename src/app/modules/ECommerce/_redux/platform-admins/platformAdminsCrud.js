import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new platformAdmin to the server
export function createProduct(platformAdmin) {
  // return axios.post(`${BASE_URL}/admin`, platformAdmin);
}

// READ
export function getAllProducts() {
  return axios.get(BASE_URL);
}

export function getProductById(platformAdminId) {
  // return axios.get(`${BASE_URL}/admin/${platformAdminId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProducts(queryParams) {
  // return axios.get(`${BASE_URL}/admin/`, { params: queryParams });
}

// export function findProducts() {
//   return axios.get(`${BASE_URL}/admin/`);
// }

// UPDATE => PUT: update the procuct on the server
export function updateProduct(platformAdmin) {
  const admin = {
    id: platformAdmin.id,
    updates: {
      name: platformAdmin.name,
      email: platformAdmin.email,
    },
  };
  // return axios.put(`${BASE_URL}/admin`, admin);
}

// UPDATE Status
export function updateStatusForProducts(ids, status) {
  return axios.post(`${BASE_URL}/updateStatusForPlatformAdmins`, {
    ids,
    status,
  });
}

// DELETE => delete the platformAdmin from the server
export function deleteProduct(platformAdminId) {
  const ids = [];
  ids.push(platformAdminId);
  return axios.delete(`${BASE_URL}/admin/delete-admins`, {
    data: { adminIds: ids },
  });
}

// DELETE Products by ids
export function deleteProducts(ids) {
  return axios.delete(`${BASE_URL}/admin/delete-admins`, {
    data: { adminIds: ids },
  });
}
