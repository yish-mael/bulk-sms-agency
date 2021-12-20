import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import * as actions from '../../../_redux/agencies/agenciesActions';
import * as roleActions from '../../../_redux/roles/rolesActions';
import { useCustomersUIContext } from '../CustomersUIContext';

const prepareFilter = (queryParams, values) => {
  const { agency, role, searchText } = values;
  const newQueryParams = { ...queryParams };

  newQueryParams.searchText = searchText;
  newQueryParams.role = role;
  newQueryParams.agency = agency;
  return newQueryParams;
};

export function CustomersFilter({ listLoading }) {
  // Customers UI Context
  const customersUIContext = useCustomersUIContext();
  const customersUIProps = useMemo(() => {
    return {
      queryParams: customersUIContext.queryParams,
      setQueryParams: customersUIContext.setQueryParams,
    };
  }, [customersUIContext]);

  const { agencies, roles } = useSelector(
    (state) => ({
      agencies: state.agencies.entities,
      roles: state.roles.entities,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Server call for getting all Agencies
    dispatch(actions.fetchCustomers(customersUIProps.queryParams));

    // Server call for getting all Roles
    dispatch(roleActions.fetchCustomers());
  }, [dispatch]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(customersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      customersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          agency: '', // values => All=""/Susspended=0/Active=1/Pending=2
          role: '', // values => All=""/Business=0/Individual=1
          searchText: '',
        }}
        onSubmit={(values) => {
          applyFilter(values);
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
              <div className="col-lg-3">
                <select
                  className="form-control"
                  name="agency"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue('agency', e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.agency}
                >
                  <option value="">All</option>
                  {agencies &&
                    agencies.length > 0 &&
                    agencies.map((agency) => (
                      <option key={agency.id} value={agency.id}>
                        {agency.name}
                      </option>
                    ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Agency
                </small>
              </div>
              <div className="col-lg-3">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="role"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue('role', e.target.value);
                    handleSubmit();
                  }}
                  value={values.role}
                >
                  <option value="">All</option>
                  {roles &&
                    roles.length > 0 &&
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Role
                </small>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue('searchText', e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
