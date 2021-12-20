import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from '../../../../../_metronic/_partials/controls';
import { Tabs, Tab } from 'react-bootstrap';
import * as agencyActions from '../../_redux/agencies/agenciesActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../_redux/compose-messages/composeMessagesActions';
import { CustomersFilter } from './customers-filter/CustomersFilter';
import { CustomersTable } from './customers-table/CustomersTable';
import { CustomersGrouping } from './customers-grouping/CustomersGrouping';
import { useCustomersUIContext } from './CustomersUIContext';

export function CustomersCard() {
  const [key, setKey] = useState('all');

  const sentMessagesUIContext = useCustomersUIContext();
  const sentMessagesUIProps = useMemo(() => {
    return {
      ids: sentMessagesUIContext.ids,
      setIds: sentMessagesUIContext.setIds,
      queryParams: sentMessagesUIContext.queryParams,
      setQueryParams: sentMessagesUIContext.setQueryParams,
      openEditCustomerDialog: sentMessagesUIContext.openEditCustomerDialog,
      openDeleteCustomerDialog: sentMessagesUIContext.openDeleteCustomerDialog,
      newCustomerButtonClick: sentMessagesUIContext.newCustomerButtonClick,
    };
  }, [sentMessagesUIContext]);

  // Getting curret state of composed messages list & authenticated user group ID from store (Redux)
  const { currentState, user } = useSelector(
    (state) => ({ currentState: state.composeMessages, user: state.auth.user }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  const getSentMessagesByStatus = (entities, status) => {
    let messages = [];

    entities &&
      entities.length > 0 &&
      entities.forEach((entity) => {
        if (entity.status === status) messages.push(entity);
      });
    return messages;
  };

  console.log(entities)

  const approvedMessages = getSentMessagesByStatus(entities, 'APPROVED');
  const sentMessages = getSentMessagesByStatus(entities, 'SENT');
  const pendingMessages = getSentMessagesByStatus(entities, 'PENDING');

  // Users Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    sentMessagesUIProps.setIds([]);
    // server call by queryParams
    dispatch(
      actions.fetchCustomers({
        ...sentMessagesUIProps.queryParams,
        agency: user.groupId?._id,
        status: key !== 'all' ? key.toUpperCase() : '',
      })
    );

    dispatch(agencyActions.fetchCustomer(user.groupId?._id));

    // dispatch(actions.fetchCustomers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, sentMessagesUIProps.queryParams, dispatch]);

  return (
    <Card>
      <CardHeader title="Sent Messages">
        {/* <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sentMessagesUIProps.newCustomerButtonClick}
          >
            New User
          </button>
        </CardHeaderToolbar> */}
      </CardHeader>
      <CardBody>
        <CustomersFilter />

        <hr />
        {sentMessagesUIProps.ids.length > 0 && <CustomersGrouping />}
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="all" title="ALL"/>
          <Tab eventKey="pending" title="PENDING"/>
          <Tab eventKey="approved" title="SCHEDULED"/>
          <Tab eventKey="sent" title="SENT"/>
        </Tabs>
        {/* {/* <CustomersFilter />
         */}
           <CustomersTable
              listLoading={listLoading}
              totalCount={totalCount}
              entities={entities}
            />
      </CardBody>
    </Card>
  );
}
