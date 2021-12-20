import React, { useState, useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/compose-messages/composeMessagesActions';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
import { CustomerEditForm } from './CustomerEditForm';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { handleAxiosResponse } from '../../../_redux/utils/helperFuncs';

export function CustomerEditDialog({ id, show, onHide }) {
  // SentMessages UI Context
  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      initMessage: sentMessagesUIContext.initMessage,
      queryParams: sentMessagesUIContext.queryParams,
    };
  }, [sentMessagesUIContext]);

  // SentMessages Redux state
  const dispatch = useDispatch();
  const { actionsLoading, error, composeMessageForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.composeMessages.actionsLoading,
      error: state.composeMessages.error,
      composeMessageForEdit: state.composeMessages.composeMessageForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Message by id
    dispatch(actions.fetchMessageById(id));
  }, [id, dispatch]);

  // server request for saving message
  const saveMessage = (user) => {
    if (!id) {
      // server request for creating message
      dispatch(actions.createCustomer(user)).then((response) => {
        handleAxiosResponse(response,'Message sent successfully', 'Oops unable to send message', dispatch,onHide);

        
      });
    } else {
      // server request for updating message
      dispatch(actions.updateCustomer(user)).then((response) => {
        handleAxiosResponse(response,'Message updated successfully', 'Oops unable to update message', dispatch,onHide);
       
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerEditDialogHeader id={id} />
      <CustomerEditForm
        id={id}
        saveMessage={saveMessage}
        actionsLoading={actionsLoading}
        message={composeMessageForEdit || sentMessagesUIProps.initMessage}
        onHide={onHide}
      />
    </Modal>
  );
}
