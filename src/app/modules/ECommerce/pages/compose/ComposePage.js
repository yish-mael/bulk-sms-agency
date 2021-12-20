import React from 'react';
import { Route } from 'react-router-dom';
import { CustomersLoadingDialog } from './customers-loading-dialog/CustomersLoadingDialog';
import { CustomerEditDialog } from './customer-edit-dialog/CustomerEditDialog';
import {ImportContact} from './compose-templates/ImportContactDialog'
import { ContactsTable } from './customers-table/CustomersTable';
import { ContactsGroupTable } from './contact.group.table/CustomersTable';
import { ComposeTemplateDialog } from './compose-templates/ComposeTemplateDialog';
import { CustomerDeleteDialog } from './customer-delete-dialog/CustomerDeleteDialog';
import { CustomersDeleteDialog } from './customers-delete-dialog/CustomersDeleteDialog';
import { CustomersFetchDialog } from './customers-fetch-dialog/CustomersFetchDialog';
import { CustomersUpdateStateDialog } from './customers-update-status-dialog/CustomersUpdateStateDialog';
import { CustomersUIProvider } from './CustomersUIContext';
import { CustomersCard } from './CustomersCard';

export function ComposePage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/compose/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/compose/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/compose/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/compose/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/compose/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/compose/updateStatus');
    },
    openContactsTableDialog: () => {
      history.push('/user/compose/add-contacts');
    },
    openContactsGroupTableDialog: () => {
      history.push('/user/compose/add-contacts-group');
    },
    openImportContactDialog: () => {
      history.push('/user/compose/import-contacts');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/compose/new">
        {({ history, match }) => (
          <ComposeTemplateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/compose');
            }}
          />
        )}
      </Route>
      <Route path="/user/compose/:id/edit">
        {({ history, match }) => (
          <ComposeTemplateDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/compose');
            }}
          />
        )}
      </Route>
      <Route path="/user/compose/import-contacts">
        {({ history, match }) => (
          <ImportContact
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/compose');
            }}
          />
        )}
      </Route>
      <Route path="/user/compose/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/compose');
            }}
          />
        )}
      </Route>
      <Route path="/user/compose/add-contacts">
        {({ history, match }) => (
          <ContactsTable
            show={match != null}
            onHide={() => history.push('/user/compose')}
          />
        )}
      </Route>
      <Route path="/user/compose/add-contacts-group">
        {({ history, match }) => (
          <ContactsGroupTable
            show={match != null}
            onHide={() => history.push('/user/compose')}
          />
        )}
      </Route>
      <Route path="/user/compose/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              // history.push('/user/compose');
              history.goBack();
            }}
          />
        )}
      </Route>
      <Route path="/user/compose/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/compose');
            }}
          />
        )}
      </Route>
      <Route path="/user/compose/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/compose');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
