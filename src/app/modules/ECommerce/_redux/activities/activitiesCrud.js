import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new agency to the server
export function createCustomer(agency) {
  return axios.post(`${BASE_URL}/admin/create-department`, agency);
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
// READ => GET: get all activities performed by platform users
export function findCustomers(queryParams) {
  console.log(queryParams)
  return axios.get(`${BASE_URL}/employee/activities`, { params: queryParams });
}

// UPDATE => PUT: update the agency on the server
export function updateCustomer(agency) {
  const _agency = {
    id: agency.id,
    updates: {
      name: agency.name,
      credit: agency.credit,
    },
  };
  return axios.put(`${BASE_URL}/admin/update-department`, _agency);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${BASE_URL}/updateStatusForAgencies`, {
    ids,
    status,
  });
}

// DELETE => delete the agency from the server
export function deleteCustomer(activityId) {
  console.log('ID', activityId);
  const ids = [];
  ids.push(activityId);
  return axios.delete(`${BASE_URL}/admin/activities`, {
    data: { activitiesId: ids },
  });
}

// DELETE Agencies by ids
export function deleteCustomers(ids) {
  console.log('Ids', ids);
  return axios.delete(`${BASE_URL}/admin/activities`, {
    data: { activitiesId: ids },
  });
}
