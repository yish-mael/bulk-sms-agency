import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';

export function CustomerEditDialogHeader({ id }) {
  // Users Redux state
  const { contactForEdit, actionsLoading } = useSelector(
    (state) => ({
      contactForEdit: state.contacts.contactForEdit,
      actionsLoading: state.contacts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : 'New contact group';
    if (contactForEdit && id) {
      _title = `Edit contact group '${contactForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [contactForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
