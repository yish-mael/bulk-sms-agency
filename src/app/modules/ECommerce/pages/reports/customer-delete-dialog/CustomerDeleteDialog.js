import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import * as actions from '../../../_redux/contacts/contactsActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';

export function CustomerDeleteDialog({ id, show, onHide }) {
  // Contacts UI Context
  const contactsUIContext = useCustomersUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      setIds: contactsUIContext.setIds,
      queryParams: contactsUIContext.queryParams,
    };
  }, [contactsUIContext]);

  // Contacts Redux state
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => ({
      isLoading: state.contacts.actionsLoading,
      error: state.contacts.error,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteContact = () => {
    // server request for deleting contact by id
    dispatch(actions.deleteCustomer(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(contactsUIProps.queryParams));
      // clear selections list
      contactsUIProps.setIds([]);
      // closing delete modal
      onHide();
      dispatch(
        setSnackbar({
          status: !error ? 'success' : 'error',
          message: (
            <p style={{ fontSize: '16px' }}>
              {!error ? `Contact deleted successfully!` : error}
            </p>
          ),
          show: true,
        })
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
          Contact Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this contact?</span>
        )}
        {isLoading && <span>Contact is deleting...</span>}
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
            onClick={deleteContact}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
