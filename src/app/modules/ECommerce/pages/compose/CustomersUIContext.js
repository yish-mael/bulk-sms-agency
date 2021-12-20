import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter, templateContents } from './CustomersUIHelpers';
import parsePhoneNumber from 'libphonenumber-js'

const CustomersUIContext = createContext();

function formatIntl(phoneNumber,countryCode){
   return parsePhoneNumber(phoneNumber,countryCode).formatInternational().split(' ').join('')
}

function formatLocal(phoneNumber){
  return parsePhoneNumber(phoneNumber).formatNational().split(' ').join('')
}
export function useCustomersUIContext() {
  return useContext(CustomersUIContext);
}

export const CustomersUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({ customersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [contacts, $setContacts] = useState([]);
  const [contactsNumbers, setContactNumbers] = useState([]);
  const [uiTemplates, setUITemplates] = useState(templateContents);
  const [composeMessage, setComposeMessage] = useState('');


  const setContacts = (updatedContacts) => {
    updatedContacts.forEach((v)=>{

    })
    let uniquePhoneNumbers = new Set([...updatedContacts.map((contact)=> formatIntl(contact.number,contact.countryCode)),...contactsNumbers]);
    const phoneNumbers = [];
    uniquePhoneNumbers.forEach((v)=>{
      phoneNumbers.push(v);
    })
    let contactToDeleteFromContactNumbers = Object.assign([],contacts);
    try{
      updatedContacts.forEach(($contact) => {
        contactToDeleteFromContactNumbers.forEach(($existingContact, index) => {
          if ($contact.number === $existingContact.number) {
            contactToDeleteFromContactNumbers.splice(index, 1);
          }
        });
      });
    }catch(e){
      console.log(e,"first clause")
    }

    
    contactToDeleteFromContactNumbers.forEach((numberToDelete) => {
      const search = phoneNumbers.indexOf(formatIntl(numberToDelete.number,numberToDelete.countryCode));
      if (search >= 0) {
        phoneNumbers.splice(search, 1);
      }
    });
    $setContacts(updatedContacts);
    setContactNumbers(phoneNumbers);
  };

  const $setContactNumbers = ($contactNumbers) => {
    console.log($contactNumbers)
    const removeDuplicate = new Set($contactNumbers);
    const contactList = [];
    removeDuplicate.forEach((number)=>contactList.push(number))
    setContactNumbers(contactList);
    const getDefinedContact = contacts.filter((contact) => {
      let contactExist = false;
      contactList.forEach(($number) => {
        if ( formatLocal($number.trim())  === contact.number.split(' ').join('')) {
          contactExist = true;
        }
      });
      return contactExist;
    });
    $setContacts(getDefinedContact);
  };
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initUser = {
    name: '',
    email: '',
    roleId: '',
    address: '',
    groupId: '',
    active: true,
    password: '',
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    contacts,
    contactsNumbers,
    setContacts,
    $setContactNumbers,
    uiTemplates,
    setUITemplates,
    setQueryParams,
    initUser,
    composeMessage,
    setComposeMessage,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    openImportContactDialog: customersUIEvents.openImportContactDialog,
    openContactsTableDialog: customersUIEvents.openContactsTableDialog,
    openContactsGroupTableDialog: customersUIEvents.openContactsGroupTableDialog,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog:
      customersUIEvents.openUpdateCustomersStatusDialog,
  };

  return (
    <CustomersUIContext.Provider value={value}>
      {children}
    </CustomersUIContext.Provider>
  );
}
