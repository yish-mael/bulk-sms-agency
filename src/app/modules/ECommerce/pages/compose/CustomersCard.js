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
import ComposeMessage from './compose-templates/ComposeMessageForm';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import {Button} from '@material-ui/core';

export function CustomersCard() {
  const composeUIContext = useCustomersUIContext();
  const composeUIProps = useMemo(() => {
    return {
      ids: composeUIContext.ids,
      openContactsTableDialog: composeUIContext.openContactsTableDialog,
      newCustomerButtonClick: composeUIContext.newCustomerButtonClick,
      openContactsGroupTableDialog: composeUIContext.openContactsGroupTableDialog,
      openImportContactDialog: composeUIContext.openImportContactDialog
    };
  }, [composeUIContext]);

  return (
    <Card>
      <CardHeader title="New Message">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            startIcon={<ContactMailIcon />}
            color="secondary"
            size="large"
            className='mx-4'
            onClick={composeUIProps.openImportContactDialog}
          >
            Import Contact
          </Button>
           <Button
            variant="outlined"
            startIcon={<ContactMailIcon />}
            color="secondary"
            size="large"
            className='mx-4'
            onClick={composeUIProps.openContactsGroupTableDialog}
          >
            Select Contact Group
          </Button>
          <Button
            variant="outlined"
            startIcon={<ContactMailIcon />}
            color="secondary"
            size="large"
            onClick={composeUIProps.openContactsTableDialog}
          >
            Add contacts
          </Button>
          {/* <Button
            variant="contained"
            size="large"
            className="btn btn-primary ml-2"
            onClick={composeUIProps.newCustomerButtonClick}
          >
            Manage Template
          </Button> */}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ComposeMessage />
      </CardBody>
    </Card>
  );
}
