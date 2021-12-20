import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import * as actions from '../../../_redux/users/usersActions';
import * as agencyActions from '../../../_redux/agencies/agenciesActions';
import * as roleActions from '../../../_redux/roles/rolesActions';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
import { CustomerEditForm } from './CustomerEditForm';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { AgencyEditForm } from './AgencyEditForm';

export function CustomerEditDialog({ id, show, onHide }) {
  const [selectedTab, setSelectedTab] = useState('AuditLogs');
  const [key, setKey] = useState('basicInfo');

  const setTab = (_tabName) => {
    setSelectedTab(_tabName);
  };

  const history = useHistory();

  // Users UI Context
  const usersUIContext = useCustomersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      queryParams: usersUIContext.queryParams,
    };
  }, [usersUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const {
    actionsLoading,
    error,
    userForEdit,
    agencyError,
    agencyActionsLoading,
    agencies,
    roles,
  } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      error: state.users.error,
      userForEdit: state.users.userForEdit,
      agencies: state.agencies.entities,
      agencyActionsLoading: state.agencies.actionsLoading,
      agencyError: state.agencies.error,
      roles: state.roles.entities,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting User by id
    dispatch(actions.fetchCustomer(id));

    // Server call for getting all agencies
    // dispatch(agencyActions.fetchCustomers());
    dispatch(
      agencyActions.fetchCustomers({
        ...usersUIProps.queryParams,
        pageSize: 1000,
      })
    );

    // Server call for getting all roles
    dispatch(
      roleActions.fetchCustomers({
        ...usersUIProps.queryParams,
        pageSize: 1000,
      })
    );
  }, [id, dispatch]);

  // server request for saving user
  const saveUser = (user) => {
    if (!id) {
      // server request for creating user
      dispatch(actions.createCustomer(user)).then(() => {
        onHide();
        dispatch(
          setSnackbar({
            status: !error ? 'success' : 'error',
            message: (
              <p style={{ fontSize: '16px' }}>
                {!error ? `User created successfully!` : error}
              </p>
            ),
            show: true,
          })
        );
      });
    } else {
      // server request for updating user
      dispatch(actions.updateCustomer(user)).then(() => {
        onHide();
        dispatch(
          setSnackbar({
            status: !error ? 'success' : 'error',
            message: (
              <p style={{ fontSize: '16px' }}>
                {!error ? `User updated successfully!` : error}
              </p>
            ),
            show: true,
          })
        );
      });
    }
  };

  // Server request for saving Agency
  const saveAgency = (values, resetForm) => {
    let _newValues = { ...values };

    dispatch(agencyActions.createCustomer(_newValues));
    dispatch(
      setSnackbar({
        status: !agencyError ? 'success' : 'error',
        message: (
          <p style={{ fontSize: '16px' }}>
            {!agencyError ? `Agency created successfully!` : agencyError}
          </p>
        ),
        show: true,
      })
    );
    resetForm({ values: '' });
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerEditDialogHeader id={id} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="basicInfo" title="Basic Info">
          <CustomerEditForm
            id={id}
            saveUser={saveUser}
            actionsLoading={actionsLoading}
            user={userForEdit || usersUIProps.initUser}
            agencies={agencies}
            roles={roles}
            onHide={onHide}
          />
        </Tab>
        <Tab eventKey="agency" title="Add Agency">
          <AgencyEditForm
            saveAgency={saveAgency}
            actionsLoading={agencyActionsLoading}
          />
        </Tab>
      </Tabs>
    </Modal>
  );
}
