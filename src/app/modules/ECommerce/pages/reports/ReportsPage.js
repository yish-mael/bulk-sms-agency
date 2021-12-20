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

export function ReportsPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/reports/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/reports/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/reports/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/reports/deleteReports`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/reports/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/reports/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/reports/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/reports');
            }}
          />
        )}
      </Route>
      <Route path="/user/reports/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/reports');
            }}
          />
        )}
      </Route>
      <Route path="/user/reports/deleteReports">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/reports');
            }}
          />
        )}
      </Route>
      <Route path="/user/reports/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/reports');
            }}
          />
        )}
      </Route>
      <Route path="/user/reports/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/reports');
            }}
          />
        )}
      </Route>
      <Route path="/user/reports/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/reports');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
