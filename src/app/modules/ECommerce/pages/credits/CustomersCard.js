import React, { useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../_metronic/_partials/controls';
import { CustomersFilter } from './customers-filter/CustomersFilter';
import { CustomersTable } from './customers-table/CustomersTable';
import { CustomersGrouping } from './customers-grouping/CustomersGrouping';
import { useCustomersUIContext } from './CustomersUIContext';

export function CustomersCard() {
  const usersUIContext = useCustomersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      newCustomerButtonClick: usersUIContext.newCustomerButtonClick,
    };
  }, [usersUIContext]);

  return (
    <Card>
      <CardHeader title="Credits">
        {/* <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={usersUIProps.newCustomerButtonClick}
          >
            New User
          </button>
        </CardHeaderToolbar> */}
      </CardHeader>
      {/* <CardBody>
        <CustomersFilter />
        {usersUIProps.ids.length > 0 && <CustomersGrouping />}
        <CustomersTable />
      </CardBody> */}
    </Card>
  );
}
