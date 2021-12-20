import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new report to the server
export function createCustomer(report) {
  return axios.post(`${BASE_URL}/report/create-report`, report);
}

export function getCustomerById(id) {
  return axios.get(`${BASE_URL}/contact/${id}`);
}

// READ => GET: get all reports by group ID from the server
export function findCustomers(queryParams) {
  return axios.get(`${BASE_URL}/report`, { params: queryParams });
}

// UPDATE => PUT: update the contact on the server
export function updateCustomer(contact) {
  const _contact = {
    id: contact.id,
    updates: {
      name: contact.name,
      number: contact.number,
    },
  };
  return axios.put(`${BASE_URL}/contact`, _contact);
}

// DELETE => delete the contact from the server
export function deleteCustomer(id) {
  return axios.delete(`${BASE_URL}/contact/${id}`);
}

// DELETE Contacts by ids
export function deleteCustomers(ids) {
  return axios.delete(`${BASE_URL}/contact/delete-contacts`, {
    data: { contactIds: ids },
  });
}
