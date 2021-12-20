import React from 'react';
import { Route } from 'react-router-dom';
import { CustomersLoadingDialog } from './customers-loading-dialog/CustomersLoadingDialog';
import { CustomerEditDialog } from './customer-edit-dialog/CustomerEditDialog';
import { CustomerDeleteDialog } from './customer-delete-dialog/CustomerDeleteDialog';
import { CustomerSendMessageDialog } from './customer-send-message-dialog/CustomerSendMessageDialog';
import { CustomersDeleteDialog } from './customers-delete-dialog/CustomersDeleteDialog';
import { CustomersFetchDialog } from './customers-fetch-dialog/CustomersFetchDialog';
import { CustomersUpdateStateDialog } from './customers-update-status-dialog/CustomersUpdateStateDialog';
import { CustomersUIProvider } from './CustomersUIContext';
import { CustomersCard } from './CustomersCard';

export function SentMessagesPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push('/user/sent-messages/new');
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/sent-messages/${id}/edit`);
    },
    openSendMessageCustomerDialog: (id) => {
      history.push(`/user/sent-messages/${id}/send`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/sent-messages/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/sent-messages/deleteUsers`);
    }, 
    openFetchCustomersDialog: () => {
      history.push(`/user/sent-messages/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push('/user/sent-messages/updateStatus');
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/sent-messages/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push('/user/sent-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/sent-messages/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/sent-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/sent-messages/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push('/user/sent-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/sent-messages/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push('/user/sent-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/sent-messages/:id/send">
        {({ history, match }) => (
          <CustomerSendMessageDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => history.push('/user/sent-messages')}
          />
        )}
      </Route>
      <Route path="/user/sent-messages/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push('/user/sent-messages');
            }}
          />
        )}
      </Route>
      <Route path="/user/sent-messages/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push('/user/sent-messages');
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
