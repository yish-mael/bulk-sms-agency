import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from '../CustomersUIHelpers';
import { useCustomersUIContext } from '../CustomersUIContext';

const selectedSentMessages = (entities, ids) => {
  const _sentMessages = [];
  ids.forEach((id) => {
    const sentMessage = entities.find((el) => el.id === id);
    if (sentMessage) {
      _sentMessages.push(sentMessage);
    }
  });
  return _sentMessages;
};

export function CustomersFetchDialog({ show, onHide }) {
  // Sent Messages UI Context
  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      ids: sentMessagesUIContext.ids,
    };
  }, [sentMessagesUIContext]);

  // Composed Messages Redux state
  const { sentMessages } = useSelector(
    (state) => ({
      sentMessages: selectedSentMessages(
        state.composeMessages.entities,
        sentMessagesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if Sent Messages weren't selected we should close modal
  useEffect(() => {
    if (!sentMessagesUIProps.ids || sentMessagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentMessagesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected messages
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {sentMessages.map((message) => (
              <tr key={`id${message.id}`}>
                <td>
                  <span className="ml-3">{message.status}</span>
                </td>
                <td>
                  <span className="ml-3">{message.date}</span>
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
