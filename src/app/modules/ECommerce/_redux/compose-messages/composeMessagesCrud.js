import axios from 'axios';
import { BASE_URL } from '../../../../../application-configuration/app.config';

// CREATE =>  POST: add a new message to the server
export function createCustomer(message) {
  return axios.post(`${BASE_URL}/message`, message);
}

export function getCustomerById(id) {
  return axios.get(`${BASE_URL}/contact/${id}`);
}

// READ => GET: get all contacts by group ID from the server
export function findCustomers(queryParams) {
  return axios.get(`${BASE_URL}/message`, { params: queryParams });
}

// UPDATE => PUT: update the message on the server
export function updateCustomer(message) {
  const _message = {
    id: message.id,
    updates: {
      message: message.message,
      contacts: message.contacts,
      scheduleDate: message.scheduleDate ? message.scheduleDate : '',
    },
  };

  console.log(_message)
  return axios.put(`${BASE_URL}/message`, _message);
}

// UPDATE => PUT: update a pending message to approved on the server
export function updatePendingMessage(id) {
  return axios.put(`${BASE_URL}/message/send-message`, { id });
}
 
// DELETE => delete the contact from the server
export function deleteCustomer(id) {
  return axios.delete(`${BASE_URL}/message/${id}`);
}

// DELETE Contacts by ids
export function deleteCustomers(ids) {
  return axios.delete(`${BASE_URL}/message/delete-messages`, {
    data: { messageIds: ids },
  });
}
