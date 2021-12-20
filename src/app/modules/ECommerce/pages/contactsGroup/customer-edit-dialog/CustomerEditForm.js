// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React,{useState} from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as moment from 'moment';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-number-input/input';
import {
  Input,
  Select,
  DatePickerField,
} from '../../../../../../_metronic/_partials/controls';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
function customSearch(searchDatas,searchStr){
  let text = searchStr;

  let collection = searchDatas;
  
  var data = collection
                if(text && text.trim() != ''){
                    data = collection
                    let  data1 = data.filter((item) => {
                         return (item.name.toLowerCase().indexOf(text.toLowerCase())  == 0);
                     })

                     data = collection
                    let  data2 = data.filter((item) => {
                         return (item.name.toLowerCase().indexOf(text.toLowerCase())  > 0);
                     })

                     data = data1.concat(data2);
                }else{
                    data = collection
                } 
  let unifyArr = Object.assign([],data);
          
 return unifyArr;
} 
// Validation schema
const ContactEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Fullname is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  groupId: Yup.string().required('This field is required'),
});

export function CustomerEditForm({
  saveContact,
  contact,
  contacts,
  groupId,
  actionsLoading,
  onHide,
}) {
  const [selectedContacts,setSelectedContacts]  = useState([]);
  const [loadExisting,setLoadExisting] = useState(false);
  if(contact.id && !loadExisting){
    setLoadExisting(true);
    setSelectedContacts([...selectedContacts,...contact.contacts])
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={contact}
        validationSchema={ContactEditSchema}
        onSubmit={(values) => {
          const selectedIds = selectedContacts.map((selectedContact)=> selectedContact.id)
          saveContact({...values,contacts:selectedIds});
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
                      placeholder="Group name"
                      label="Group Name"
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="form-group col-lg-12">
                   {
                     contact.id && (
                      <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={contacts}
                      getOptionLabel={(option) => `${option.name}`}
                      filterOptions={(options,state) => {
                        const $options = options.filter((opt) => {
                          let include = true;
                          selectedContacts.forEach((contact) => {
                            if (contact.id === opt.id) {
                              include = false;
                            }
                          });
                          return include;
                        });
                        const filteredBySearch = customSearch($options,state.inputValue)
                        return filteredBySearch;
                      }}
                      value={selectedContacts}
                      filterSelectedOptions
                      onChange={(event, value) => {
                        setSelectedContacts(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="senderIds"
                          variant="outlined"
                          label="Search & Add Contacts to group"
                          placeholder="Search contacts"
                          fullWidth
                        />
                      )}
                      fullWidth
                    />
                     )
                   }
                  </div>
                  {/* Group */}
                 
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
