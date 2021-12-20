import React from "react";
import { Route } from "react-router-dom";
import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
import { CustomerEditDialog } from "./customer-edit-dialog/CustomerEditDialog";
import { CustomerDeleteDialog } from "./customer-delete-dialog/CustomerDeleteDialog";
import { CustomersDeleteDialog } from "./customers-delete-dialog/CustomersDeleteDialog";
import { CustomersFetchDialog } from "./customers-fetch-dialog/CustomersFetchDialog";
import { CustomersUpdateStateDialog } from "./customers-update-status-dialog/CustomersUpdateStateDialog";
import { CustomersUIProvider } from "./CustomersUIContext";
import { CustomersCard } from "./CustomersCard";

export function UsersPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push("/admin/users/new");
    },
    openEditCustomerDialog: (id) => {
      history.push(`/admin/users/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/admin/users/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/admin/users/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/admin/users/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push("/admin/users/updateStatus");
    }
  }

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/admin/users/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push("/admin/users");
            }}
          />
        )}
      </Route>
      <Route path="/admin/users/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/admin/users");
            }}
          />
        )}
      </Route>
      <Route path="/admin/users/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/admin/users");
            }}
          />
        )}
      </Route>
      <Route path="/admin/users/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/admin/users");
            }}
          />
        )}
      </Route>
      <Route path="/admin/users/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/admin/users");
            }}
          />
        )}
      </Route>
      <Route path="/admin/users/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/admin/users");
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
