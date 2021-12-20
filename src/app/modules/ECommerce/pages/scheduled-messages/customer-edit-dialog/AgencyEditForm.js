// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  Select,
  DatePickerField,
} from '../../../../../../_metronic/_partials/controls';

// Validation schema
const AgencyEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Agency name is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  credit: Yup.number()
    .typeError('This field must be a number')
    .positive('This field must not contain the "-" symbol')
    .required('This field is required'),
});

export function AgencyEditForm({ saveAgency, actionsLoading, onHide }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: '',
          credit: '',
        }}
        validationSchema={AgencyEditSchema}
        onSubmit={(values, { resetForm }) => {
          saveAgency(values, resetForm);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Agency Name */}
                  <div className="form-group col-lg-12">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Agency Name"
                      label="Agency Name"
                    />
                  </div>
                  {/* Amount of SMS */}
                  <div className="form-group col-lg-12">
                    <Field
                      name="credit"
                      component={Input}
                      placeholder="Credit"
                      label="Credit"
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button
                        type="submit"
                        style={{ display: 'block' }}
                        className="btn btn-primary"
                        // disabled={disabled}
                      >
                        Add Agency
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            {/* <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer> */}
          </>
        )}
      </Formik>
    </>
  );
}
