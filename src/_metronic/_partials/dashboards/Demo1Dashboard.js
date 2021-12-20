import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as userActions from '../../../app/modules/ECommerce/_redux/users/usersActions';
import * as agencyActions from '../../../app/modules/ECommerce/_redux/agencies/agenciesActions';
import * as adminActions from '../../../app/modules/ECommerce/_redux/platform-admins/platformAdminsActions';
import {
  MixedWidget1,
  MixedWidget4,
  MixedWidget14,
  ListsWidget9,
  StatsWidget11,
  StatsWidget12,
  ListsWidget1,
  AdvanceTablesWidget2,
  AdvanceTablesWidget4,
  ListsWidget3,
  ListsWidget4,
  ListsWidget8,
} from '../widgets';
import { CustomMixedWidget } from '../widgets/mixed/CustomMixedWidget1';

const queryParams = {
  pageNumber: 1,
  pageSize: 10,
};

export function Demo1Dashboard() {
  const { users, agencies, platformAdmins } = useSelector(
    (state) => ({
      users: state.users,
      agencies: state.agencies,
      platformAdmins: state.platformAdmins,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Server call for getting all users
    dispatch(userActions.fetchCustomers(queryParams));

    // Server call for getting all agencies
    dispatch(agencyActions.fetchCustomers(queryParams));

    // Server call for getting all platform admins
    dispatch(adminActions.fetchProducts(queryParams));
  }, [dispatch, queryParams]);

  let totalCounts;

  if (users && agencies && platformAdmins) {
    totalCounts = {
      userTotalCount: users.totalCount,
      agencyTotalCount: agencies.totalCount,
      adminTotalCount: platformAdmins.totalCount,
    };
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MixedWidget4
            totalCounts={totalCounts}
            className="card-stretch gutter-b"
          />
        </div>
        <div className="col-lg-6 col-xxl-4">
          <ListsWidget9 className="card-stretch gutter-b" />
        </div>

        {/* <div className="col-lg-12 col-xxl-4">
          <div className="row">
            <div className="col-lg-8">
              <CustomMixedWidget className="card-stretch gutter-b" />
            </div>
          </div>
        </div> */}

        {/* <div className="col-lg-6 col-xxl-4">
          <StatsWidget11
            className="card-stretch card-stretch-half gutter-b"
            symbolShape="circle"
            baseColor="success"
          />
          <StatsWidget12 className="card-stretch card-stretch-half gutter-b" />
        </div>

        <div className="col-lg-6 col-xxl-4 order-1 order-xxl-1">
          <ListsWidget1 className="card-stretch gutter-b" />
        </div> */}
        {/* <div className="col-xxl-8 order-2 order-xxl-1">
          <AdvanceTablesWidget2 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
          <ListsWidget3 className="card-stretch gutter-b" />
        </div> */}
        {/* <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
          <ListsWidget4 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2">
          <ListsWidget8 className="card-stretch gutter-b" />
        </div> */}
      </div>
      <div className="row">
        <div className="col-lg-4">
          <MixedWidget14 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-8">
          <AdvanceTablesWidget4 className="card-stretch gutter-b" />
        </div>
      </div>
    </>
  );
}
