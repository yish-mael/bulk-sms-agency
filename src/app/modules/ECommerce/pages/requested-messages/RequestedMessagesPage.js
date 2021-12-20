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

export function RequestedMessagesPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/requested-messages/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/requested-messages/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/requested-messages/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/requested-messages/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/requested-messages/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/requested-messages/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/requested-messages/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/requested-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/requested-messages/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/requested-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/requested-messages/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/requested-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/requested-messages/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/requested-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/requested-messages/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/requested-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/requested-messages/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/requested-messages');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
