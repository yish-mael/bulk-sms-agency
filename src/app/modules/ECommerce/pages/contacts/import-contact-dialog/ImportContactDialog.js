import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ComposeTemplateDialogHeader } from '../../compose/compose-templates/ComposeTemplateDialogHeader';
import {ImportContact as ImportContactModule} from '../../../components/import.contact'


export function ImportContact({ id, show, onHide }) {
  
  // Users Redux state
  const dispatch = useDispatch();
  const done = (contacts)=>{
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
      <ImportContactModule cancel={onHide} uploadContact onFinish={done}/>
    </Modal>
  );
}
