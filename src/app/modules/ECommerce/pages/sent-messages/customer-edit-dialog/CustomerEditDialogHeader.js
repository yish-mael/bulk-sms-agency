import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';

export function CustomerEditDialogHeader({ id }) {
  // SentMessages Redux state
  const { composeMessageForEdit, actionsLoading } = useSelector(
    (state) => ({
      composeMessageForEdit: state.composeMessages.composeMessageForEdit,
      actionsLoading: state.composeMessages.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState('');
  // Title couting
  useEffect(() => {
    let _title = id ? '' : 'New Message';
    if (composeMessageForEdit && id) {
      _title = `Edit Message`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [composeMessageForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
