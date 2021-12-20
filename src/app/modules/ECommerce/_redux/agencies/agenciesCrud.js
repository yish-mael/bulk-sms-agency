import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new agency to the server
export function createCustomer(agency) {
  // return axios.post(`${BASE_URL}/admin/create-department`, agency);
}

// READ
export function getAllCustomers() {
  return axios.get(BASE_URL);
}

export function getCustomerById(agencyId) {
  return axios.get(`${BASE_URL}/department/${agencyId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  // return axios.get(`${BASE_URL}/admin/get-department`, { params: queryParams });
}

// export function findCustomers() {
//   return axios.get(`${BASE_URL}/admin/get-department`);
// }

// UPDATE => PUT: update the agency on the server
export function updateCustomer(agency) {
  const _agency = {
    id: agency.id,
    updates: {
      name: agency.name,
      credit: agency.credit,
    },
  };
  // return axios.put(`${BASE_URL}/admin/update-department`, _agency);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${BASE_URL}/updateStatusForAgencies`, {
    ids,
    status,
  });
}

// DELETE => delete the agency from the server
export function deleteCustomer(agencyId) {
  const ids = [];
  ids.push(agencyId);
  // return axios.delete(`${BASE_URL}/admin/delete-groups`, {
  //   data: { groupIds: ids },
  // });
}

// DELETE Agencies by ids
export function deleteCustomers(ids) {
  // return axios.delete(`${BASE_URL}/admin/delete-groups`, {
  //   data: { groupIds: ids },
  // });
}
