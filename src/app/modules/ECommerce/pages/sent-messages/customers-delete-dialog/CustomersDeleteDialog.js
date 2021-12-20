import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/compose-messages/composeMessagesActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';

export function CustomersDeleteDialog({ show, onHide }) {
  // Sent Messages UI Context
  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      ids: sentMessagesUIContext.ids,
      setIds: sentMessagesUIContext.setIds,
      queryParams: sentMessagesUIContext.queryParams,
    };
  }, [sentMessagesUIContext]);

  // Messages Redux state
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => ({
      isLoading: state.composeMessages.actionsLoading,
      error: state.composeMessages.error,
    }),
    shallowEqual
  );

  // if sent messages weren't selected we should close modal
  useEffect(() => {
    if (!sentMessagesUIProps.ids || sentMessagesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentMessagesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteMessages = () => {
    // server request for deleting sent message by selected ids
    dispatch(actions.deleteCustomers(sentMessagesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(sentMessagesUIProps.queryParams)).then(
        () => {
          // clear selections list
          sentMessagesUIProps.setIds([]);
          // closing delete modal
          onHide();
          dispatch(
            setSnackbar({
              status: !error ? 'success' : 'error',
              message: (
                <p style={{ fontSize: '14px' }}>
                  {!error ? `Messages deleted!` : error}
                </p>
              ),
              show: true,
            })
          );
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Delete Messages
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected messages?</span>
        )}
        {isLoading && <span>Messages are deleting...</span>}
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
            onClick={deleteMessages}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
