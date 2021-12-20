import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new contact to the server
export function createCustomer(contact) {
  return axios.post(`${BASE_URL}/contact-group`, contact);
}

export function getCustomerById(id) {
  return axios.get(`${BASE_URL}/contact-group/${id}`);
}

// READ => GET: get all contacts by group ID from the server
export function findCustomers(queryParams) {
  return axios.get(`${BASE_URL}/contact-group`, { params: queryParams });
}

// UPDATE => PUT: update the contact on the server
export function updateCustomer(contact) {
  const _contact = {
    id: contact.id,
    updates: {
      name: contact.name,
      contacts: contact.contacts,
    },
  };
  console.log(_contact)
  return axios.put(`${BASE_URL}/contact-group`,_contact);
}

// DELETE => delete the contact from the server
export function deleteCustomer(id) {
  return axios.delete(`${BASE_URL}/contact-group`,{
    data: {contactGroupIds: [id]}
  });
}

// DELETE Contacts by ids
export function deleteCustomers(ids) {
  return axios.delete(`${BASE_URL}/contact-group`, {
    data: { contactGroupIds: ids },
  });
}
