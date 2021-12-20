// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/reports/reportsActions';
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
  // Reports UI Context
  const reportsUIContext = useCustomersUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      ids: reportsUIContext.ids,
      setIds: reportsUIContext.setIds,
      queryParams: reportsUIContext.queryParams,
      setQueryParams: reportsUIContext.setQueryParams,
      openEditCustomerDialog: reportsUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: reportsUIContext.openDeleteCustomerDialog,
    };
  }, [reportsUIContext]);

  // Getting curret state of reports list & authenticated user object from store (Redux)
  const { currentState, user } = useSelector(
    (state) => ({ currentState: state.reports, user: state.auth.user }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Reports Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    reportsUIProps.setIds([]);
    // server call for fetching all contacts
    dispatch(
      actions.fetchCustomers({
        ...reportsUIProps.queryParams,
        agency: user.groupId?._id,
      })
    );
  }, [reportsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: 'fullName',
      text: 'Full Name',
      sort: true,
      
      headerSortingClasses,
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true,
      
      headerSortingClasses,
    },
    {
      dataField: 'message',
      text: 'Report',
      sort: true,
      
      headerSortingClasses,
    },
    // {
    //   dataField: 'action',
    //   text: 'Actions',
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditCustomerDialog: reportsUIProps.openEditCustomerDialog,
    //     openDeleteCustomerDialog: reportsUIProps.openDeleteCustomerDialog,
    //   },
    //   classes: 'text-right pr-0',
    //   headerClasses: 'text-right pr-3',
    //   style: {
    //     minWidth: '100px',
    //   },
    // },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: reportsUIProps.queryParams.pageSize,
    page: reportsUIProps.queryParams.pageNumber,
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
                  reportsUIProps.setQueryParams
                )}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: reportsUIProps.ids,
                //   setIds: reportsUIProps.setIds,
                // })}
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
