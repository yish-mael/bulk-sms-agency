import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Formik } from 'formik';
import * as actions from '../../../_redux/agencies/agenciesActions';
import * as userActions from '../../../_redux/users/usersActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import { isEqual } from 'lodash';

const prepareFilter = (queryParams, values) => {
  const { userType, role, searchText } = values;
  const newQueryParams = { ...queryParams };

  newQueryParams.searchText = searchText;
  newQueryParams.role = role;
  newQueryParams.userType = userType;
  return newQueryParams;
};
export function CustomersFilter({ listLoading }) {
  const [selectedAgency, setSelectedAgency] = useState('');

  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
    };
  }, [customersUIContext]);

    // queryParams, setQueryParams,
    const applyFilter = (values) => {
      const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
      if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
        newQueryParams.pageNumber = 1;
        // update list by queryParams
        customersUIProps.setQueryParams(newQueryParams);
      }
    };

  const { agencies, users } = useSelector(
    (state) => ({
      agencies: state.agencies.entities,
      users: state.users.entities,
    }),
    shallowEqual
  );

  // Create a variable that will later store list of users related to a selected agency
  let _users = [];

  if (users && users.length > 0) {
    // Map through users array and get all users that belongs to the selected agency
    users.forEach((user) => {
      if (user && user.groupId && user.groupId._id === selectedAgency) {
        _users.push(user);
      }
      return user;
    });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // Server call for getting all agencies
    // dispatch(actions.fetchCustomers(customersUIProps.queryParams));

    // Server call for getting all users
    // dispatch(userActions.fetchCustomers(customersUIProps.queryParams));
  }, [selectedAgency, dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          userType: '',
          user: '',
        }}
        onSubmit={(values) => {
          applyFilter(values)
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-4">
                <select
                  className="form-control"
                  name="userType"
                  placeholder="select Account type"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue('userType', e.target.value);
                    setSelectedAgency(e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.agency}
                >
                  <option value="">Select Account type</option>
                  <option value="ADMIN-ACCOUNT">Admin</option>
                  <option value="AGENCY-ACCOUNT">Agency</option>

                </select>
                <small className="form-text text-muted">
                  Filter by <b>Account type</b>
                </small>
              </div>
              {/* <div className="col-lg-4">
                <select
                  className="form-control"
                  placeholder="Select User"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue('user', e.target.value);
                  }}
                  value={values.user}
                >
                  <option value="">Select User</option>
                  {_users &&
                    _users.length > 0 &&
                    _users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
                <small className="form-text text-muted">
                  Select <b>User</b>
                </small>
              </div> */}
              {/* <div className="col-lg-4">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Filter
                </button>
              </div> */}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
