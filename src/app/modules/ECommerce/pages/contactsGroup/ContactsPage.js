import React from 'react';
import { Route } from 'react-router-dom';
import { CustomersLoadingDialog } from './customers-loading-dialog/CustomersLoadingDialog';
import { CustomerEditDialog } from './customer-edit-dialog/CustomerEditDialog';
import { CustomerDeleteDialog } from './customer-delete-dialog/CustomerDeleteDialog';
import { CustomersDeleteDialog } from './customers-delete-dialog/CustomersDeleteDialog';
import { CustomersFetchDialog } from './customers-fetch-dialog/CustomersFetchDialog';
import { CustomersUpdateStateDialog } from './customers-update-status-dialog/CustomersUpdateStateDialog';
import { CustomersUIProvider } from './CustomersUIContext';
import { CustomersCard } from './CustomersCard';
import {ImportContact} from './import-contact-dialog/ImportContactDialog'


export function ContactsGroupPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/contacts-group/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/contacts-group/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/contacts-group/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/contacts-group/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/contacts-group/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/contacts-group/updateStatus');
    },
    openImportContactDialog: () => {
      history.push('/user/contacts-group/import-contacts');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/contacts-group/import-contacts">
        {({ history, match }) => (
          <ImportContact
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <Route path="/user/contacts-group/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <Route path="/user/contacts-group/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <Route path="/user/contacts-group/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <Route path="/user/contacts-group/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <Route path="/user/contacts-group/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <Route path="/user/contacts-group/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/contacts-group');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
