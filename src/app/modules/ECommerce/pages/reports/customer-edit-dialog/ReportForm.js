// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Typography, Button } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import * as actions from '../../../_redux/reports/reportsActions';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';

// Validation schema
const NewReportSchema = Yup.object().shape({
  message: Yup.string()
    .min(10, 'Minimum 10 symbols')
    .max(560, 'Maximum 50 symbols')
    .required('Message is required'),
  // .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
});

export function ReportForm() {
  const dispatch = useDispatch();
  const { user, actionsLoading, error } = useSelector(
    (state) => ({
      user: state.auth.user,
      actionsLoading: state.reports.actionsLoading,
      error: state.reports.error,
    }),
    shallowEqual
  );

  useEffect(() => {}, [dispatch, actionsLoading]);

  const history = useHistory();

  const onHide = () => history.push('/user/reports');

  // server request for saving report
  const sendReport = (report) => {
    // server request for creating report
    dispatch(actions.createCustomer(report)).then(() => {
      onHide();
      dispatch(
        setSnackbar({
          status: !error ? 'success' : 'error',
          message: (
            <p style={{ fontSize: '14px' }}>
              {!error ? `Report Sent!` : error}
            </p>
          ),
          show: true,
        })
      );
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          message: '',
          employeeId: user._id,
          groupId: user.groupId._id,
        }}
        validationSchema={NewReportSchema}
        onSubmit={(values, { resetForm }) => {
          sendReport(values);
          resetForm({ values: '' });
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <div className="d-flex flex-column row form-group mb-5 offset-1">
              <Typography
                style={{ fontSize: 28, fontWeight: '600' }}
                variant="h3"
                gutterBottom
              >
                We are here to assist you!
              </Typography>
              <Typography
                style={{ marginTop: -10, fontSize: 12 }}
                className="text-muted"
                variant="h6"
                gutterBottom
              >
                The complaint and your identity will be treated as strictly
                confidential
              </Typography>
            </div>
            {actionsLoading && (
              <div className="d-flex justify-content-center mt-2">
                {actionsLoading && (
                  <div className="overlay-layer bg-transparent">
                    <div className="spinner spinner-lg spinner-success" />
                  </div>
                )}
              </div>
            )}
            <Form className="form form-label-right">
              <div className="form-group row offset-1">
                {/* Template Message */}
                <div className="col-lg-8">
                  <label>Complaint</label>
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Enter Your Message here..."
                    value={values.message}
                    rows="5"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('message', e.target.value);
                    }}
                  ></textarea>
                  {!errors.message && !touched.message ? null : (
                    <div className="text-danger">{errors.message}</div>
                  )}
                </div>
              </div>
              <div className="row form-group offset-1">
                <Button
                  size="large"
                  startIcon={<Cancel />}
                  onClick={onHide}
                  className="btn btn-light btn-elevate mr-3"
                >
                  Cancel
                </Button>
                <> </>
                <Button
                  size="large"
                  startIcon={<Send />}
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="btn btn-primary btn-elevate"
                >
                  Send
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
