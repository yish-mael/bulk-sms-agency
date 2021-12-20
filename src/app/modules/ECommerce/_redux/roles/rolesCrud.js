import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new role to the server
export function createCustomer(role) {
  // return axios.post(`${BASE_URL}/admin/create-role`, role);
}

// READ
export function getAllCustomers() {
  return axios.get(BASE_URL);
}

export function getCustomerById(roleId) {
  // return axios.get(`${BASE_URL}/admin/get-role/:id`, roleId);
  // return axios.get(`${BASE_URL}/admin/get-role/${roleId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  // return axios.get(`${BASE_URL}/admin/get-role`, { params: queryParams });
}

// export function findCustomers() {
//   return axios.get(`${BASE_URL}/admin/get-role`);
// }

// UPDATE => PUT: update the role on the server
export function updateCustomer(role) {
  const _role = {
    id: role.id,
    updates: {
      name: role.name,
      sendMessage: role.sendMessage,
      readMessage: role.readMessage,
      addContact: role.addContact,
    },
  };
  // return axios.put(`${BASE_URL}/admin/update-role`, _role);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  // return axios.post(`${BASE_URL}/updateStatusForUsers`, {
  //   ids,
  //   status,
  // });
}

// DELETE => delete the role from the server
export function deleteCustomer(roleId) {
  // return axios.delete(`${BASE_URL}/admin/delete-role/${roleId}`);
}

// DELETE Users by ids
export function deleteCustomers(ids) {
  // return axios.delete(`${BASE_URL}/admin/delete-roles`, {
  //   data: { roleIds: ids },
  // });
}
