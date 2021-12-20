// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/activities/activitiesActions';
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
  // Activities UI Context
  const activitiesUIContext = useCustomersUIContext();
  const activitiesUIProps = useMemo(() => {
    return {
      ids: activitiesUIContext.ids,
      setIds: activitiesUIContext.setIds,
      queryParams: activitiesUIContext.queryParams,
      setQueryParams: activitiesUIContext.setQueryParams,
      openEditCustomerDialog: activitiesUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: activitiesUIContext.openDeleteCustomerDialog,
    };
  }, [activitiesUIContext]);

  // Getting curret state of activities list from store (Redux)
  const { currentState,user } = useSelector(
    (state) => ({ currentState: state.activities, user: state.auth.user }),

    shallowEqual
  );

  const { totalCount, entities, listLoading } = currentState;

  // Users Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    activitiesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCustomers({...activitiesUIProps.queryParams,agency: user.groupId._id}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activitiesUIProps.queryParams, dispatch]);
  // Table columns  
  const columns = [
    {
      dataField: 'name',
      text: 'Full Name',
      sort: true,
      
      headerSortingClasses,
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      formatter: columnFormatters.TypeColumnFormatter,
      
      headerSortingClasses,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: false,
      
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: false,
      
    },
    // {
    //   dataField: 'action',
    //   text: 'Actions',
    //   formatter: columnFormatters.ActionsColumnFormatter,
    //   formatExtraData: {
    //     openEditCustomerDialog: activitiesUIProps.openEditCustomerDialog,
    //     openDeleteCustomerDialog: activitiesUIProps.openDeleteCustomerDialog,
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
    sizePerPage: activitiesUIProps.queryParams.pageSize,
    page: activitiesUIProps.queryParams.pageNumber,
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
                  activitiesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: activitiesUIProps.ids,
                  setIds: activitiesUIProps.setIds,
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
