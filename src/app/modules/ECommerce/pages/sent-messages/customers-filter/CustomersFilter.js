import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Formik } from 'formik';
import { isEqual } from 'lodash';
import * as Yup from 'yup';
import * as actions from '../../../_redux/agencies/agenciesActions';
import * as roleActions from '../../../_redux/roles/rolesActions';
import { useCustomersUIContext } from '../CustomersUIContext';

const FilterDatesSchema = Yup.object().shape({
  startDate: Yup.date().required('Start Date is required.'),
  endDate: Yup.date().required('End Date is required.'),
});

const prepareFilter = (queryParams, values) => {
  const { startDate, endDate } = values;
  const newQueryParams = { ...queryParams };

  newQueryParams.startDate = startDate;
  newQueryParams.endDate = endDate;
  console.log(queryParams)
  return newQueryParams;
};

export function CustomersFilter({ listLoading }) {
  // State data for validate filtered dates
  const [firstDate, setFirstDate] = useState('');
  const [disableEndDate, setDisableEndDate] = useState(true);

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
    customersUIProps.setQueryParams(newQueryParams);
  };

  return (
    <>
      <Formik
        initialValues={{
          startDate: '',
          endDate: '',
        }}
        validationSchema={FilterDatesSchema}
        onSubmit={(values) => {
          let _values = { ...values };

          _values.startDate = new Date(values.startDate).toString();
          _values.endDate = new Date(values.endDate).toString();
          applyFilter(_values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
          isValid,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  placeholder="Start date"
                  onBlur={handleBlur}
                  value={values.startDate}
                  onChange={(e) => {
                    setFieldValue('startDate', e.target.value);
                    setFirstDate(e.target.value);
                    setDisableEndDate(false);
                  }}
                  // onChange={handleChange}
                />

                {errors.startDate && touched.startDate ? (
                  <div className="text-danger">{errors.startDate}</div>
                ) : (
                  <small className="form-text text-muted">
                    <b>Start Date</b>
                  </small>
                )}
              </div>
              <div className="col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  disabled={disableEndDate}
                  placeholder="End date"
                  onBlur={handleBlur}
                  value={values.endDate}
                  onChange={handleChange}
                  min={firstDate}
                />

                {errors.endDate && touched.endDate ? (
                  <div className="text-danger">{errors.endDate}</div>
                ) : (
                  <small className="form-text text-muted">
                    <b>End Date</b>
                  </small>
                )}
              </div>
              <div className="col-lg-4">
                <input
                  type="submit"
                  disabled={!isValid || !dirty}
                  onClick={() => handleSubmit}
                  value="Filter"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
