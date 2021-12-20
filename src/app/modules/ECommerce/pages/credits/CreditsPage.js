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

export function CreditsPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/credits/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/credits/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/credits/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/credits/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/credits/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/credits/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/credits/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/credits');
            }}
          />
        )}
      </Route>
      <Route path="/user/credits/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/credits');
            }}
          />
        )}
      </Route>
      <Route path="/user/credits/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/credits');
            }}
          />
        )}
      </Route>
      <Route path="/user/credits/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/credits');
            }}
          />
        )}
      </Route>
      <Route path="/user/credits/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/credits');
            }}
          />
        )}
      </Route>
      <Route path="/user/credits/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/credits');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
