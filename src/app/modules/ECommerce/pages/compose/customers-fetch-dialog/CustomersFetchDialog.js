import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from '../CustomersUIHelpers';
import { useCustomersUIContext } from '../CustomersUIContext';

const selectedContacts = (entities, ids) => {
  const _contacts = [];
  ids.forEach((id) => {
    const contact = entities.find((el) => el.id === id);
    if (contact) {
      _contacts.push(contact);
    }
  });
  return _contacts;
};

export function CustomersFetchDialog({ show, onHide }) {
  // Messages UI Context
  const messagesUIContext = useCustomersUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
    };
  }, [messagesUIContext]);

  // Contacts Redux state
  const { contacts } = useSelector(
    (state) => ({
      contacts: selectedContacts(state.contacts.entities, messagesUIProps.ids),
    }),
    shallowEqual
  );

  // if contacts weren't selected we should close modal
  useEffect(() => {
    if (!messagesUIProps.ids || messagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected contacts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>FULL NAME</th>
              <th>PHONE NUMBER</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={`id${contact.id}`}>
                <td>
                  <span className="ml-3">{contact.name}</span>
                </td>
                <td>
                  <span className="ml-3">{contact.number}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
