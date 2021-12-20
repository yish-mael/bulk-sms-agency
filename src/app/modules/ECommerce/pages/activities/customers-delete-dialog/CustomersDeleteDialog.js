import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/activities/activitiesActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';

export function CustomersDeleteDialog({ show, onHide }) {
  // Activities UI Context
  const activitiessUIContext = useCustomersUIContext();
  const activitiesUIProps = useMemo(() => {
    return {
      ids: activitiessUIContext.ids,
      setIds: activitiessUIContext.setIds,
      queryParams: activitiessUIContext.queryParams,
    };
  }, [activitiessUIContext]);

  // Activities Redux state
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => ({
      isLoading: state.activities.actionsLoading,
      error: state.activities.error,
    }),
    shallowEqual
  );

  // if activities weren't selected we should close modal
  useEffect(() => {
    if (!activitiesUIProps.ids || activitiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activitiesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteActivities = () => {
    // server request for deleting activity by selected ids
    dispatch(actions.deleteCustomers(activitiesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(activitiesUIProps.queryParams)).then(
        () => {
          // clear selections list
          activitiesUIProps.setIds([]);
          // closing delete modal
          onHide();
          dispatch(
            setSnackbar({
              status: !error ? 'success' : 'error',
              message: (
                <p style={{ fontSize: '16px' }}>
                  {!error ? `Activities deleted successfully!` : error}
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
          Delete Activities
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected activities?</span>
        )}
        {isLoading && <span>Activities are deleting...</span>}
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
            onClick={deleteActivities}
            className="btn btn-danger btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
