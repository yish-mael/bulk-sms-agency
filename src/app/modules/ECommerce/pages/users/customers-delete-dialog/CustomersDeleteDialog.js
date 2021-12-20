import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/users/usersActions";
import { useCustomersUIContext } from "../CustomersUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";
import { setSnackbar } from "../../../_redux/snackbar/snackbarActions";

export function CustomersDeleteDialog({ show, onHide }) {
  // Users UI Context
  const usersUIContext = useCustomersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      queryParams: usersUIContext.queryParams,
    };
  }, [usersUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const { isLoading, error, } = useSelector(
    (state) => ({ 
      isLoading: state.users.actionsLoading, 
      error: state.users.error,
    }),
    shallowEqual
  );

  // if users weren't selected we should close modal
  useEffect(() => {
    if (!usersUIProps.ids || usersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteUsers = () => {
    // server request for deleting user by selected ids
    dispatch(actions.deleteCustomers(usersUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCustomers(usersUIProps.queryParams)).then(
        () => {
          // clear selections list
          usersUIProps.setIds([]);
          // closing delete modal
          onHide();
          dispatch(
            setSnackbar({
              status: !error ? "success" : "error",
              message: (
                <p style={{ fontSize: "16px" }}>
                  {!error ? `Users deleted successfully!` : error}
                </p>
              ),
              show: true
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
          Users Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected users?</span>
        )}
        {isLoading && <span>Users are deleting...</span>}
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
            onClick={deleteUsers}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
