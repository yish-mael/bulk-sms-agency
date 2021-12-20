// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Input,
  Select,
  DatePickerField,
} from '../../../../../../_metronic/_partials/controls';
import parsePhoneNumber from 'libphonenumber-js';


// Validation schema
const NewReportSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
  contacts: Yup.array().required()
  // .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

export function CustomerEditForm({
  saveMessage,
  message,
  actionsLoading,
  onHide,
}) {
  const classes = useStyles();
  const [contacts, setContacts] = useState([]);
  const [errorPhone,setErrorPhone] = useState(false);
  const [contactNumbers,setContactNumbers] = useState([])
  const [init,setInit] = useState(false);


  console.log(message)
  if(!init){
    if(message.contacts){
      setInit(true);
      setContactNumbers(message.contacts)
    }
  }

  
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={message}
        validationSchema={NewReportSchema}
        onSubmit={(values) => {
          saveMessage(values);
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
                <Autocomplete
                        multiple
                        id="tags-filled"
                        value={contactNumbers}
                        freeSolo
                        fullWidth
                        options={[]}
                        onChange={(event, value,) => {
                          if(event.target.value === undefined){
                            setErrorPhone(false);
                            setFieldValue("contacts",value)
                            return setContactNumbers(value);

                          }
                          const phone = parsePhoneNumber(event.target.value);
                          if(phone){
                            if(phone.isValid()){
                               value.pop();
                               value.push(phone.formatInternational().split(' ').join(''))
                               setFieldValue("contacts",value)
                               setContactNumbers(value);
                               setErrorPhone(false)
                            }else{
                              setErrorPhone(true)
                            }
                          }else{
                            setErrorPhone(true)
                          }
                          event.preventDefault();
                          return false;
                          // setFieldValue('contacts',value)
                          // validate value to be a number before passing to context
                        }}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={errorPhone}
                            type="tel"
                            helperText="Phone number should be in international format e.g +2349050705444"
                            variant="outlined"
                            label="Enter phone number"
                            placeholder="Contacts"
                            fullWidth
                          />
                        )}
                      />
                  <div className="col-lg-12 mt-3">
                    <label className="font-weight-bold">Message:</label>
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
                      style={{ width: '100%' }}
                    ></textarea>
                    {!errors.message && !touched.message ? null : (
                      <div className="text-danger">{errors.message}</div>
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
