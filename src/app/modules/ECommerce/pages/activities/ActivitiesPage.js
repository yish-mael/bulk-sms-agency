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

export function ActivitiesPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push("/user/activities/new");
    },
    openEditCustomerDialog: (id) => {
      history.push(`/user/activities/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/user/activities/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/user/activities/deleteUsers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/user/activities/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push("/user/activities/updateStatus");
    }
  }

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />
      <Route path="/user/activities/new">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            onHide={() => {
              history.push("/user/activities");
            }}
          />
        )}
      </Route>
      <Route path="/user/activities/:id/edit">
        {({ history, match }) => (
          <CustomerEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/user/activities");
            }}
          />
        )}
      </Route>
      <Route path="/user/activities/deleteUsers">
        {({ history, match }) => (
          <CustomersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/user/activities");
            }}
          />
        )}
      </Route>
      <Route path="/user/activities/:id/delete">
        {({ history, match }) => (
          <CustomerDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/user/activities");
            }}
          />
        )}
      </Route>
      <Route path="/user/activities/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/user/activities");
            }}
          />
        )}
      </Route>
      <Route path="/user/activities/updateStatus">
        {({ history, match }) => (
          <CustomersUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/user/activities");
            }}
          />
        )}
      </Route>
      <CustomersCard />
    </CustomersUIProvider>
  );
}
