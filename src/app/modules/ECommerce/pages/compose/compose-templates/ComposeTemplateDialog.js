import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab, Nav } from 'react-bootstrap';
import * as actions from '../../../_redux/compose-messages/composeMessagesActions';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { ComposeTemplateDialogHeader } from './ComposeTemplateDialogHeader';
import { useCustomersUIContext } from '../CustomersUIContext';
import { AddNewTemplateForm } from './AddNewTemplateForm';
import ComposeTemplateList from './ComposeTemplateList';

export function ComposeTemplateDialog({ id, show, onHide }) {
  const [selectedTab, setSelectedTab] = useState('AuditLogs');
  const [key, setKey] = useState('templates');

  const setTab = (_tabName) => {
    setSelectedTab(_tabName);
  };

  const history = useHistory();

  // Users UI Context
  const usersUIContext = useCustomersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      initUser: usersUIContext.initUser,
      uiTemplates: usersUIContext.uiTemplates,
      setUITemplates: usersUIContext.setUITemplates,
      queryParams: usersUIContext.queryParams,
      setComposeMessage: usersUIContext.setComposeMessage,

    };
  }, [usersUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const { error } = useSelector(
    (state) => ({
      error: state.composeMessages.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting User by id
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  const saveTemplate = (values, resetForm) => {
    const { message } = values;
    let _uiTemplates = [...usersUIProps.uiTemplates];
    let _template = {
      id: usersUIProps.uiTemplates.length + 1,
      message,
    };

    _uiTemplates.unshift(_template);
    usersUIProps.setUITemplates(_uiTemplates);
    resetForm({ values: '' });
    setKey('templates');
  };

  const removeTemplate = (id) => {
    const _uiTemplates = usersUIProps.uiTemplates.filter(
      (template) => template.id !== id
    );
    usersUIProps.setUITemplates(_uiTemplates);
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ComposeTemplateDialogHeader id={id} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="templates" title="Templates">
          <ComposeTemplateList
            uiTemplates={usersUIProps.uiTemplates}
            removeTemplate={removeTemplate}
            onHide={onHide}
            setComposeMessage={(template)=>{
              usersUIProps.setComposeMessage(template)
              onHide();
            }}
          />
        </Tab>
        <Tab eventKey="addTemplate" title="Add Template">
          <AddNewTemplateForm
            id={id}
            saveTemplate={saveTemplate}
            onHide={() => setKey('templates')}
          />
        </Tab>
      </Tabs>
    </Modal>
  );
}
