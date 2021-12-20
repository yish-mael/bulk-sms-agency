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
  const reportsUIContext = useCustomersUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      ids: reportsUIContext.ids,
      newCustomerButtonClick: reportsUIContext.newCustomerButtonClick,
    };
  }, [reportsUIContext]);

  return (
    <Card>
      <CardHeader title="Report">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={reportsUIProps.newCustomerButtonClick}
          >
            New Report
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <CustomersFilter />
        {reportsUIProps.ids.length > 0 && <CustomersGrouping />} */}
        <CustomersTable />
      </CardBody>
    </Card>
  );
}
