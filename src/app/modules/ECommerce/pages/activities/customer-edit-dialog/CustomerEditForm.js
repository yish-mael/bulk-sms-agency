// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const UserEditSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Fullname is required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  address: Yup.string()
    .required("Address is required")
    .matches(/(?!^\d+$)^.+$/, "Only numbers are not allowed for this field"),
  role: Yup.string().required('This field is required'),
  agency: Yup.string().required('This field is required')
});

export function CustomerEditForm({
  saveUser,
  user,
  agencies,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          saveUser(values);
        }}
      >
        {({ 
          handleSubmit,
          errors,
          touched 
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Full Name */}
                  <div className="col-lg-4">
                    <Field
                      name="fullName"
                      component={Input}
                      placeholder="Full Name"
                      label="Full Name"
                    />
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Field
                      type="email"
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  {/* address */}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                      // customFeedbackLabel="We'll never share user address with anyone else"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Role */}
                  <div className="col-lg-4">
                    <Select name="role" label="Role">
                      <option value="select">--- Select Role---</option>
                      <option value="Checker">Checker</option>
                      <option value="Maker">Maker</option>
                    </Select>
                    {errors.role && touched.role && (
                      <div className="text-danger">{errors.role}</div>
                    )}
                  </div>
                  {/* Type */}
                  <div className="col-lg-4">
                    <Select name="agency" label="Agency">
                      <option value="select">--- Select Agency---</option>
                      {agencies && agencies.map(agency => (
                        <option key={agency.id} value={agency.name}>{agency.name}</option>
                      ))} 
                    </Select>
                    {errors.agency && touched.agency && (
                      <div className="text-danger">{errors.agency}</div>
                    )}
                  </div>
                  {/* Password */}
                  <div className="col-lg-4">   
                    <Field
                      type="password"
                      name="password"   
                      component={Input}
                      placeholder="Password"
                      label="Password"
                    />
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
