import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from "../CustomersUIHelpers";
import * as actions from "../../../_redux/users/usersActions";
import { useCustomersUIContext } from "../CustomersUIContext";

const selectedUsers = (entities, ids) => {
  const _users = [];
  ids.forEach((id) => {
    const user = entities.find((el) => el.id === id);
    if (user) {
      _users.push(user);
    }
  });
  return _users;
};

export function CustomersUpdateStateDialog({ show, onHide }) {
  // Customers UI Context
  const usersUIContext = useCustomersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      setIds: usersUIContext.setIds,
      queryParams: usersUIContext.queryParams,
    };
  }, [usersUIContext]);

  // Customers Redux state
  const { users, isLoading } = useSelector(
    (state) => ({
      users: selectedUsers(
        state.users.entities,
        usersUIProps.ids
      ),
      isLoading: state.users.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!usersUIProps.ids || usersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update customers status by selected ids
    dispatch(actions.updateCustomersStatus(usersUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCustomers(usersUIProps.queryParams)).then(
          () => {
            // clear selections list
            usersUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected users
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
              <th>ID</th>
              <th>CUSTOMER</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={`id${user.id}`}>
                <td>{user.id}</td>
                <td>
                  <span className="ml-3">
                    {user.fullName}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {user.email}
                  </span>
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
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
