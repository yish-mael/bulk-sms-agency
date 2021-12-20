// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/compose-messages/composeMessagesActions';
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

export function CustomersTable({ listLoading, totalCount, entities }) {
  // Sent Messages UI Context
  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      ids: sentMessagesUIContext.ids,
      setIds: sentMessagesUIContext.setIds,
      queryParams: sentMessagesUIContext.queryParams,
      setQueryParams: sentMessagesUIContext.setQueryParams,
      openEditCustomerDialog: sentMessagesUIContext.openEditCustomerDialog,
      openSendMessageCustomerDialog:
        sentMessagesUIContext.openSendMessageCustomerDialog,
      openDeleteCustomerDialog: sentMessagesUIContext.openDeleteCustomerDialog,
    };
  }, [sentMessagesUIContext]);

  // Getting curret state of composed messages list & authenticated user group ID from store (Redux)
  const { user } = useSelector(
    (state) => ({ user: state.auth.user }),
    shallowEqual
  );
  
  // Table columns
  const columns = [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      headerSortingClasses,
    },
    {
      dataField: 'contacts',
      text: 'Recipient',
      sort: true,
      formatter: columnFormatters.RecipientsColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: 'message',
      text: 'Message',
      sort: false,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: 'action',
      text: 'Actions',
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        user,
        openSendMessageCustomerDialog:
          sentMessagesUIProps.openSendMessageCustomerDialog,
        openEditCustomerDialog: sentMessagesUIProps.openEditCustomerDialog,
        openDeleteCustomerDialog: sentMessagesUIProps.openDeleteCustomerDialog,
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
    sizePerPage: sentMessagesUIProps.queryParams.pageSize,
    page: sentMessagesUIProps.queryParams.pageNumber,
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
                  sentMessagesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: sentMessagesUIProps.ids,
                  setIds: sentMessagesUIProps.setIds,
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
