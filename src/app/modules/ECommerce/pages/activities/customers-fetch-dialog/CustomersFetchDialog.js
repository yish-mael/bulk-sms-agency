import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import {
  CustomerStatusCssClasses,
  CustomerStatusTitles,
} from '../CustomersUIHelpers';
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

export function CustomersFetchDialog({ show, onHide }) {
  // Activities UI Context
  const activitiesUIContext = useCustomersUIContext();
  const activitiesUIProps = useMemo(() => {
    return {
      ids: activitiesUIContext.ids,
    };
  }, [activitiesUIContext]);

  // Activities Redux state
  const { activities } = useSelector(
    (state) => ({
      activities: selectedActivities(
        state.activities.entities,
        activitiesUIProps.ids
      ),
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected activities
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
