import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

const formatUserObj = (user) => {
  let _user = { ...user };
  delete _user.active;
  return _user;
};

// CREATE =>  POST: add a new user to the server
export function createCustomer(user) {
  const _user = formatUserObj(user);
  return axios.post(`${BASE_URL}/contact`, _user);
}

// READ
export function getAllCustomers() {
  return axios.get(BASE_URL);
}

export function getCustomerById(userId) {
  return axios.get(`${BASE_URL}/employee/${userId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  // return axios.get(`${BASE_URL}/admin/get-employees`, { params: queryParams });
}

// export function findCustomers() {
//   return axios.get(`${BASE_URL}/admin/get-employees`);
// }

// UPDATE => PUT: update the user on the server
export function updateCustomer(user) {
  const _user = {
    id: user.id,
    updates: {
      name: user.name,
      email: user.email,
      address: user.address,
      roleId: typeof user.roleId === 'string' ? user.roleId : user.roleId._id,
      groupId:
        typeof user.groupId === 'string' ? user.groupId : user.groupId._id,
      active: user.active,
    },
  };
  // return axios.put(`${BASE_URL}/admin/update-employee`, _user);
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${BASE_URL}/updateStatusForUsers`, {
    ids,
    status,
  });
}

// DELETE => delete the user from the server
export function deleteCustomer(userId) {
  const ids = [];
  ids.push(userId);
  return axios.delete(`${BASE_URL}/admin/delete-employees`, {
    data: { employeeIds: ids },
  });
}

// DELETE Users by ids
export function deleteCustomers(ids) {
  return axios.delete(`${BASE_URL}/admin/delete-employees`, {
    data: { employeeIds: ids },
  });
}
