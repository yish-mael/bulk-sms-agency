// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/contacts/contactsActions';
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses, 
} from '../../../../../../_metronic/_helpers';
import * as uiHelpers from '../CustomersUIHelpers';
import * as columnFormatters from './column-formatters';
import { Pagination } from '../../../../../../_metronic/_partials/controls';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomersTable() {
  // Contacts UI Context
  const contactsUIContext = useCustomersUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      ids: contactsUIContext.ids,
      setIds: contactsUIContext.setIds,
      queryParams: contactsUIContext.queryParams,
      setQueryParams: contactsUIContext.setQueryParams,
      openEditCustomerDialog: contactsUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: contactsUIContext.openDeleteCustomerDialog,
    };
  }, [contactsUIContext]);

  // Getting curret state of contacts list & authenticated user object from store (Redux)
  const { currentState, user } = useSelector(
    (state) => ({ currentState: state.contacts, user: state.auth.user }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Contacts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    contactsUIProps.setIds([]);
    // server call for fetching all contacts
    dispatch(
      actions.fetchCustomers({
        ...contactsUIProps.queryParams,
        agency: user.groupId._id,
      })
    );
  }, [contactsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: 'name',
      text: 'Full Name',
      sort: true,
      
      headerSortingClasses,
    },
    {
      dataField: 'number',
      text: 'Phone Number',
      sort: true,
      
      headerSortingClasses,
    },
    {
      dataField: 'countryCode',
      text: 'Country Code',
      sort: true,
      
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCustomerDialog: contactsUIProps.openEditCustomerDialog,
        openDeleteCustomerDialog: contactsUIProps.openDeleteCustomerDialog,
      },
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      style: {
        minWidth: '100px',
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: contactsUIProps.queryParams.pageSize,
    page: contactsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  contactsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: contactsUIProps.ids,
                  setIds: contactsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
