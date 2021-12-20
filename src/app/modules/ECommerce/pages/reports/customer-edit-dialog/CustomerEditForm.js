// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as moment from 'moment';
import { Typography, Button } from '@material-ui/core';
import { Send, Cancel } from '@material-ui/icons';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input/input';
import {
  Input,
  Select,
  DatePickerField,
} from '../../../../../../_metronic/_partials/controls';

// Validation schema
const NewReportSchema = Yup.object().shape({
  message: Yup.string()
    .min(10, 'Minimum 10 symbols')
    .max(560, 'Maximum 50 symbols')
    .required('Message is required'),
  // .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
});

export function CustomerEditForm({
  sendReport,
  report,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      {actionsLoading && (
        <div className="d-flex justify-content-center mt-2">
          {actionsLoading && (
            <div className="overlay-layer bg-transparent">
              <div className="spinner spinner-lg spinner-success" />
            </div>
          )}
        </div>
      )}
      <Formik
        enableReinitialize={true}
        initialValues={report}
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
            <div className="d-flex flex-column row form-group mt-5 mb-3 offset-2">
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
               
              </Typography>
            </div>
            <Modal.Body>
              <Form className="form form-label-right">
                <div className="form-group row offset-2">
                  {/* Template Message */}
                  <div className="col-lg-8">
                    <label className="font-weight-bold">Complaint:</label>
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
