import React, { useEffect, useState, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from '../CustomersUIHelpers';
// import * as actions from '../../../_redux/compose-messages/composeMessagesActions';
import { useCustomersUIContext } from '../CustomersUIContext';

const selectedMessages = (entities, ids) => {
  const _messages = [];
  ids.forEach((id) => {
    const message = entities.find((el) => el.id === id);
    if (message) {
      _messages.push(message);
    }
  });
  return _messages;
};

export function CustomersUpdateStateDialog({ show, onHide }) {
  // Sent Messages UI Context
  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      ids: sentMessagesUIContext.ids,
      setIds: sentMessagesUIContext.setIds,
      queryParams: sentMessagesUIContext.queryParams,
    };
  }, [sentMessagesUIContext]);

  // Composed Messages Redux state
  const { messages, isLoading } = useSelector(
    (state) => ({
      messages: selectedMessages(
        state.composeMessages.entities,
        sentMessagesUIProps.ids
      ),
      isLoading: state.composeMessages.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!sentMessagesUIProps.ids || sentMessagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentMessagesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  // const updateStatus = () => {
  //   // server request for update messages status by selected ids
  //   dispatch(
  //     actions.updateCustomersStatus(sentMessagesUIProps.ids, status)
  //   ).then(() => {
  //     // refresh list after deletion
  //     dispatch(actions.fetchCustomers(sentMessagesUIProps.queryParams)).then(
  //       () => {
  //         // clear selections list
  //         sentMessagesUIProps.setIds([]);
  //         // closing delete modal
  //         onHide();
  //       }
  //     );
  //   });
  // };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected messages
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>STATUS</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            // onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
