// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormHelperText, Switch } from '@material-ui/core';
import {
  Input,
  Select,
  DatePickerField,
} from '../../../../../../_metronic/_partials/controls';

// Validation schema
const UserEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Fullname is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  address: Yup.string()
    .required('Address is required')
    .matches(/(?!^\d+$)^.+$/, 'Only numbers are not allowed for this field'),
  roleId: Yup.string().required('This field is required'),
  groupId: Yup.string().required('This field is required'),
});

export function CustomerEditForm({
  id,
  saveUser,
  user,
  agencies,
  roles,
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
          handleChange,
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
                {id && (
                  <div className="form-group d-flex">
                    <label className="col-form-label text-lg-right mr-2">
                      Change User Status
                    </label>
                    <div>
                      <Switch
                        onChange={handleChange}
                        name="active"
                        checked={values.active}
                      />
                      <FormHelperText style={{ textAlign: 'center' }}>
                        {values.active ? 'Deactivate' : 'Activate'}
                      </FormHelperText>
                    </div>
                  </div>
                )}
                <div className="form-group row">
                  {/* Full Name */}
                  <div className="col-lg-4">
                    <Field
                      name="name"
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
                  <div className={id ? 'col-lg-6' : 'col-lg-4'}>
                    <Select
                      name="roleId"
                      label="Role"
                      onChange={(e) => {
                        setFieldValue('roleId', e.target.value);
                      }}
                      value={
                        id && values.roleId
                          ? values.roleId._id
                          : !id
                          ? values.roleId
                          : ''
                      }
                    >
                      <option value="select">--- Select Role---</option>
                      {roles &&
                        roles.length > 0 &&
                        roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                    </Select>
                    {errors.roleId && touched.roleId && (
                      <div className="text-danger">{errors.roleId}</div>
                    )}
                  </div>
                  {/* Type */}
                  <div className={id ? 'col-lg-6' : 'col-lg-4'}>
                    <Select
                      name="groupId"
                      label="Agency"
                      onChange={(e) => {
                        setFieldValue('groupId', e.target.value);
                      }}
                      value={
                        id && values.groupId
                          ? values.groupId._id
                          : !id
                          ? values.groupId
                          : ''
                      }
                    >
                      <option value="select">--- Select Agency---</option>
                      {agencies &&
                        agencies.map((agency) => (
                          <option key={agency.id} value={agency.id}>
                            {agency.name}
                          </option>
                        ))}
                    </Select>
                    {errors.groupId && touched.groupId && (
                      <div className="text-danger">{errors.groupId}</div>
                    )}
                  </div>
                  {/* Password */}
                  {!id && (
                    <div className="col-lg-4">
                      <Field
                        type="password"
                        name="password"
                        component={Input}
                        placeholder="Password"
                        label="Password"
                      />
                    </div>
                  )}
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
