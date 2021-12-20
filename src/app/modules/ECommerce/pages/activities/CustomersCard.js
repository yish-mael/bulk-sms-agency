import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CustomersFilter } from "./customers-filter/CustomersFilter";
import { CustomersTable } from "./customers-table/CustomersTable";
import { CustomersGrouping } from "./customers-grouping/CustomersGrouping";
import { useCustomersUIContext } from "./CustomersUIContext";

export function CustomersCard() {
  const activitiesUIContext = useCustomersUIContext();
  const activitiesUIProps = useMemo(() => {
    return {
      ids: activitiesUIContext.ids,
      newCustomerButtonClick: activitiesUIContext.newCustomerButtonClick,
    };
  }, [activitiesUIContext]);

  return (
    <Card>
      <CardHeader title="Activities">
        {/* <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={activitiesUIProps.newCustomerButtonClick}
          >
            New User
          </button>
        </CardHeaderToolbar> */}
      </CardHeader>
      <CardBody>
        {/* <CustomersFilter /> */}
        {activitiesUIProps.ids.length > 0 && <CustomersGrouping />}
        <CustomersTable />
      </CardBody>
    </Card>
  );
}
