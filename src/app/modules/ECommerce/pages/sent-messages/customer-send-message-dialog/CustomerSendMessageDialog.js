import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import * as actions from '../../../_redux/compose-messages/composeMessagesActions';
import * as agencyActions from '../../../_redux/agencies/agenciesActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { Send, Cancel } from '@material-ui/icons';
import { Button, Chip } from '@material-ui/core';
import { handleAxiosResponse } from '../../../_redux/utils/helperFuncs';

export function CustomerSendMessageDialog({ id, show, onHide }) {
  // Sent Messages UI Context
  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      setIds: sentMessagesUIContext.setIds,
      queryParams: sentMessagesUIContext.queryParams,
      message: sentMessagesUIContext.message
    }; 
  }, [sentMessagesUIContext]);

  // Composed Messages Redux state
  const dispatch = useDispatch();
  const { isLoading, error,user } = useSelector(
    (state) => ({
      isLoading: state.composeMessages.actionsLoading,
      error: state.composeMessages.error,
      user: state.auth.user
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

  const sendMessage = () => {
    // server request for sending message by id
    dispatch(actions.updatePendingMessage(id)).then((response) => {
      dispatch(agencyActions.fetchCustomer(user.groupId?._id));
      // refresh list after message has been sent 
      // dispatch(actions.fetchCustomers(sentMessagesUIProps.queryParams));
      // clear selections list
      sentMessagesUIProps.setIds([]);
      // closing send message modal
      handleAxiosResponse(response,'Message sent successfully', 'Oops unable to send message', dispatch,onHide);
      
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
          Send Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Are you sure to send this message?</span>}
        {isLoading && <span>Sending message...</span>}
        <div className="d-flex mt-3">
            {
              sentMessagesUIProps.message?.contacts.map((contact)=>  <Chip label={contact}/>)
            }
        </div>
        <div style={{backgroundColor:'whitesmoke', padding:10, borderRadius:10,marginTop:10}}>
           {sentMessagesUIProps.message?.message}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            startIcon={<Cancel />}
            variant="outlined"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </Button>
          <> </>
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={sendMessage}
            className="btn btn-primary btn-elevate"
          >
            Send
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
