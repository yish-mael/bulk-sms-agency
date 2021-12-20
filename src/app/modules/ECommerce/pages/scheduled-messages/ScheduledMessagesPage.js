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

export function ScheduledMessagesPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      // history.push('/user/scheduled-messages/new');
      history.push('/user/compose');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/scheduled-messages/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/scheduled-messages/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/scheduled-messages/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/scheduled-messages/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/scheduled-messages/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/scheduled-messages/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/scheduled-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/scheduled-messages/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/scheduled-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/scheduled-messages/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/scheduled-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/scheduled-messages/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/scheduled-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/scheduled-messages/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/scheduled-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/scheduled-messages/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/scheduled-messages');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
