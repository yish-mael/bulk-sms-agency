// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as moment from 'moment';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PhoneInput from 'react-phone-number-input/input';
import {TextField} from '@material-ui/core'
import {
  Input,
  Select,
  DatePickerField,
} from '../../../../../../_metronic/_partials/controls';
import CountryCodes from '../../../_redux/utils/countryCodes'

// Validation schema
const ContactEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Fullname is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  number: Yup.string().required('Phone number is required'),
  groupId: Yup.string().required('This field is required'),
  countryCode: Yup.string().length(2).required('Country code is required')
});

export function CustomerEditForm({
  saveContact,
  contact,
  groupId,
  actionsLoading,
  onHide,
}) {

  const [error,SetError] = useState(false)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={contact}
        validationSchema={ContactEditSchema}
        onSubmit={(values) => {
          saveContact(values);
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
                <div className="form-group row">
                  {/* Full Name */}
                  <div className="form-group col-lg-12">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Full Name"
                      label="Full Name"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="form-group col-lg-12">
                    {/* <PhoneInput
                      country="NG"
                      placeholder="Phone Number"
                      value={values.number}
                      onChange={(e) => {
                        setFieldValue('number', e.target.value);
                      }}
                    /> */}
                    <Field
                      name="number"
                      component={Input}
                      placeholder="Phone Number"
                      label="Phone Number"
                    />
                  </div>
                  {/* Group */}
                  <div className="form-group col-lg-12">
                    <Autocomplete
                      id="tags-outlined"
                      options={CountryCodes}
                      getOptionLabel={(option) => `${option}`}
                      filterSelectedOptions
                      value={contact.countryCode ? contact.countryCode: ""}
                      onChange={(event, value) => {
                        setFieldValue('countryCode', value);
                      }}
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          error={error}
                          onBlur={()=> SetError(!values.countryCode?true:false)}
                          helperText={error? "Please select country code":''}
                          name="countryCode"
                          variant="outlined"
                          label="Country code"
                          placeholder="Select country code"
                      />
                      )}
                      fullWidth
        />
                  </div>
                  <div className="form-group col-lg-12">
                    <input
                      type="hidden"
                      name="groupId"
                      value={values.groupId}
                      className="form-control"
                      onChange={(e) => {
                        setFieldValue('groupId', groupId);
                      }}
                    />
                    {errors.groupId && touched.groupId && (
                      <div className="text-danger">{errors.groupId}</div>
                    )}
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
