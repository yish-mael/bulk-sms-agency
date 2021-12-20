import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/contacts/contactsActions';
import * as agencyActions from '../../../_redux/agencies/agenciesActions';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
import { CustomerEditForm } from './CustomerEditForm';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { handleAxiosResponse } from '../../../_redux/utils/helperFuncs';

export function CustomerEditDialog({ id, show, onHide }) {
  // Users UI Context
  const contactsUIContext = useCustomersUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      initContact: contactsUIContext.initContact,
      queryParams: contactsUIContext.queryParams,
    };
  }, [contactsUIContext]);

  // Users Redux state
  const dispatch = useDispatch();
  const { actionsLoading, error, user, contactForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.contacts.actionsLoading,
      error: state.contacts.error,
      user: state.auth.user,
      contactForEdit: state.contacts.contactForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting User by id
    dispatch(actions.fetchCustomer(id));

    // Server call for getting all agencies
    // dispatch(
    //   agencyActions.fetchCustomers({
    //     ...contactsUIProps.queryParams,
    //     pageSize: 1000,
    //   })
    // );
  }, [id, dispatch]);

  // server request for saving contact
  const saveContact = (contact) => {
    if (!id) {
      // server request for creating a contact
      dispatch(actions.createCustomer([contact])).then((response) => {
        handleAxiosResponse(response,'Contact created successfully', 'Oops unable to create contact', dispatch,onHide);
      });
    } else {
      // server request for updating a contact
      dispatch(actions.updateCustomer(contact)).then((response) => {
        
        handleAxiosResponse(response,'Contact updated successfully', 'Oops unable to update contact', dispatch,onHide);
      });
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerEditDialogHeader id={id} />
      <CustomerEditForm
        id={id}
        saveContact={saveContact}
        actionsLoading={actionsLoading}
        contact={
          contactForEdit || {
            ...contactsUIProps.initContact,
            groupId: user.groupId._id,
          }
        }
        groupId={user.groupId._id}
        onHide={onHide}
      />
    </Modal>
  );
}
