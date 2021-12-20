import React, { useEffect, useState, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from '../CustomersUIHelpers';
import * as actions from '../../../_redux/activities/activitiesActions';
import { useCustomersUIContext } from '../CustomersUIContext';

const selectedActivities = (entities, ids) => {
  const _activities = [];
  ids.forEach((id) => {
    const activity = entities.find((el) => el.id === id);
    if (activity) {
      _activities.push(activity);
    }
  });
  return _activities;
};

export function CustomersUpdateStateDialog({ show, onHide }) {
  // Activities UI Context
  const activitiesUIContext = useCustomersUIContext();
  const activitiesUIProps = useMemo(() => {
    return {
      ids: activitiesUIContext.ids,
      setIds: activitiesUIContext.setIds,
      queryParams: activitiesUIContext.queryParams,
    };
  }, [activitiesUIContext]);

  // Activities Redux state
  const { activities, isLoading } = useSelector(
    (state) => ({
      activities: selectedActivities(
        state.activities.entities,
        activitiesUIProps.ids
      ),
      isLoading: state.activities.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!activitiesUIProps.ids || activitiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activitiesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update activities status by selected ids
    dispatch(actions.updateCustomersStatus(activitiesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCustomers(activitiesUIProps.queryParams)).then(
          () => {
            // clear selections list
            activitiesUIProps.setIds([]);
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
          Status has been updated for selected activities
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
              <th>FULL NAME</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={`id${activity.id}`}>
                <td>
                  <span className="ml-3">{activity.name}</span>
                </td>
                <td>
                  <span className="ml-3">{activity.description}</span>
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
