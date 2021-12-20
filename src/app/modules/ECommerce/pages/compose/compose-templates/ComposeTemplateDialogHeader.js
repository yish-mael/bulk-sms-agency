import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';

export function ComposeTemplateDialogHeader({ id }) {
  // Users Redux state
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Import Contacts
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
