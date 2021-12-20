import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import * as actions from '../../../_redux/activities/activitiesActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';

export function CustomerDeleteDialog({ id, show, onHide }) {
  // Activities UI Context
  const activitiesUIContext = useCustomersUIContext();
  const activitiesUIProps = useMemo(() => {
    return {
      setIds: activitiesUIContext.setIds,
      queryParams: activitiesUIContext.queryParams,
    };
  }, [activitiesUIContext]);

  // Activities Redux state
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => ({
      isLoading: state.activities.actionsLoading,
      error: state.activities.error,
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

  const deleteActivity = () => {
    // server request for deleting activity by id
    dispatch(actions.deleteCustomer(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(activitiesUIProps.queryParams));
      // clear selections list
      activitiesUIProps.setIds([]);
      // closing delete modal
      onHide();
      dispatch(
        setSnackbar({
          status: !error ? 'success' : 'error',
          message: (
            <p style={{ fontSize: '16px' }}>
              {!error ? `Activity deleted successfully!` : error}
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
          Delete Activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this activity?</span>
        )}
        {isLoading && <span>Activity is deleting...</span>}
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
            onClick={deleteActivity}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
