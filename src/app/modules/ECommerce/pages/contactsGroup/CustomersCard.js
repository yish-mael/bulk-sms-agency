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
  const contactsUIContext = useCustomersUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      ids: contactsUIContext.ids,
      newCustomerButtonClick: contactsUIContext.newCustomerButtonClick,
      openImportContactDialog: contactsUIContext.openImportContactDialog
    };
  }, [contactsUIContext]);

  return (
    <Card>
      <CardHeader title="Contacts Groups">
        <CardHeaderToolbar>
        <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={contactsUIProps.openImportContactDialog}
          >
            Import Contact
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={contactsUIProps.newCustomerButtonClick}
          >
            New Group
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CustomersFilter />
        {contactsUIProps.ids.length > 0 && <CustomersGrouping />}
        <CustomersTable />
      </CardBody>
    </Card>
  );
}
