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

export function BulkMessagePage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/bulk-message/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/bulk-message/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/bulk-message/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/bulk-message/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/bulk-message/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/bulk-message/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/bulk-message/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/bulk-message');
            }}
          />
        )}
      </Route>
      <Route path="/user/bulk-message/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/bulk-message');
            }}
          />
        )}
      </Route>
      <Route path="/user/bulk-message/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/bulk-message');
            }}
          />
        )}
      </Route>
      <Route path="/user/bulk-message/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/bulk-message');
            }}
          />
        )}
      </Route>
      <Route path="/user/bulk-message/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/bulk-message');
            }}
          />
        )}
      </Route>
      <Route path="/user/bulk-message/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/bulk-message');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
