// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { Modal } from 'react-bootstrap';
import { ModalProgressBar } from '../../../../../../_metronic/_partials/controls';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/contactsGroup/contactsActions';
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
import ContactsFilter from './ContactsFilter';

const selectedContacts = (entities, ids) => {
  let _contacts = [];

  ids.forEach((id) => {
    let contact = entities.find((el) => el.id === id);
    if (contact) {
      _contacts.push(contact);
    }
  });
  return _contacts;
};

export function ContactsGroupTable({ show, onHide }) {
  // Messages UI Context
  const messagesUIContext = useCustomersUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      ids: messagesUIContext.ids,
      setIds: messagesUIContext.setIds,
      contacts: messagesUIContext.contacts,
      setContacts: messagesUIContext.setContacts,
      queryParams: messagesUIContext.queryParams,
      setQueryParams: messagesUIContext.setQueryParams,
      openEditCustomerDialog: messagesUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: messagesUIContext.openDeleteCustomerDialog,
    };
  }, [messagesUIContext]);

  // Getting curret state of contacts list from store (Redux)
  const { currentState, _contacts,user } = useSelector(
    (state) => ({
      currentState: state.contactsGroup,
      user: state.auth.user,
      _contacts: selectedContacts(state.contacts.entities, messagesUIProps.ids),
    }),
    shallowEqual
  ); 
  const { totalCount, allContactGroups, listLoading } = currentState;

  const handleAddContacts = () => {
    // let _contacts = [...contacts];
    // let phoneNumbers = [];
    // _contacts.forEach((el) => {
    //   let _el = { ...el };
    //   phoneNumbers.push(_el.number);
    // });

    // messagesUIProps.setContacts([...messagesUIProps.contacts, ...phoneNumbers]);
    // messagesUIProps.setIds([]);
    onHide();
  };

  // Users Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    messagesUIProps.setIds([]); 
    // server call by queryParams
     
    dispatch(
      actions.fetchUpaginatedCustomers({
        ...messagesUIProps.queryParams,
        agency: user.groupId?._id,
        pageSize: 10000, 
      })
    );
    // dispatch(actions.fetchCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: 'name',
      text: 'Group Name',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: messagesUIProps.queryParams.pageSize,
    page: messagesUIProps.queryParams.pageNumber,
  };
  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Select group to send message . 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactsFilter
          contacts={allContactGroups}
          contactsInContext={messagesUIProps.contacts}
          setContactsInContext={messagesUIProps.setContacts}
        />
        {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
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
                    messagesUIProps.setQueryParams
                  )}
                  selectRow={getSelectRow({
                    entities,
                    ids: messagesUIProps.ids,
                    setIds: messagesUIProps.setIds,
                    selectedContacts: messagesUIProps.contacts,
                  })}
                  {...paginationTableProps}
                >
                  <PleaseWaitMessage entities={entities} />
                  <NoRecordsFoundMessage entities={entities} />
                </BootstrapTable>
              </Pagination>
            );
          }}
        </PaginationProvider> */}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={() => handleAddContacts()}
            className="btn btn-primary btn-elevate"
          >
            Done
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
