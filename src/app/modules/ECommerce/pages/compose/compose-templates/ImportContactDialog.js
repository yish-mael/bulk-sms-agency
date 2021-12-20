import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ComposeTemplateDialogHeader } from './ComposeTemplateDialogHeader';
import { useCustomersUIContext } from '../CustomersUIContext';
import {ImportContact as ImportContactModule} from '../../../components/import.contact'
import parsePhoneNumber from 'libphonenumber-js'


export function ImportContact({ id, show, onHide }) {

   // Users UI Context
  const usersUIContext = useCustomersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      uiTemplates: usersUIContext.uiTemplates,
      setUITemplates: usersUIContext.setUITemplates,
      queryParams: usersUIContext.queryParams,
      setComposeMessage: usersUIContext.setComposeMessage,
      $setContactNumbers: usersUIContext.$setContactNumbers,
    }; 
  }, [usersUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const done = (contacts)=>{
    const numbers = contacts.map((contact)=> parsePhoneNumber(contact.number,contact.countryCode).formatInternational().split(' ').join('') )
  

      usersUIProps.$setContactNumbers(numbers)
      onHide();
      // do something with contact here
  }

 

 
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ComposeTemplateDialogHeader id={id} />
      <ImportContactModule cancel={onHide} onFinish={done}/>
    </Modal>
  );
}
