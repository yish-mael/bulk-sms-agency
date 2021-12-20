// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Validation schema
const NewTemplateSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
  // .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
});

export function AddNewTemplateForm({ saveTemplate, actionsLoading, onHide }) {
  const [characterCount, setCharacterCount] = useState(0);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ message: '' }}
        validationSchema={NewTemplateSchema}
        onSubmit={(values, { resetForm }) => {
          saveTemplate(values, resetForm);
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
            <Modal.Body className="overlay overlay-block cursor-default">
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
                    <label>Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      placeholder="Enter Your Message here..."
                      value={values.message}
                      rows="4"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue('message', e.target.value);
                        setCharacterCount(e.target.value.length);
                      }}
                    ></textarea>
                    {errors.message && touched.message ? (
                      <div className="text-danger">{errors.message}</div>
                    ) : null}
                    <span>
                      Characters: {characterCount}/{!characterCount ? 0 : 1024}
                    </span>
                    {characterCount > 1024 ? (
                      <div className="text-danger">
                        You have exceeded 1024 characters.
                      </div>
                    ) : null}
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
