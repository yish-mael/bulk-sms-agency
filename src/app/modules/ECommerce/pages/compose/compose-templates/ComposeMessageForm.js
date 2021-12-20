/* eslint-disable no-use-before-define */
import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import * as _ from 'underscore';
import 'date-fns';
import * as moment from 'moment';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorIcon from '@material-ui/icons/Error'
import ScheduleIcon from '@material-ui/icons/Schedule';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../../_redux/contacts/contactsActions';
import { useCustomersUIContext } from '../CustomersUIContext';
import * as messageActions from '../../../_redux/compose-messages/composeMessagesActions';
import * as agencyActions from '../../../_redux/agencies/agenciesActions';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { handleAxiosResponse } from '../../../_redux/utils/helperFuncs';
import parsePhoneNumber from 'libphonenumber-js';
import * as SmsCounter from '@marcinkowalczyk/sms-counter'


// Validation schema
const ComposeMessageSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
  // contacts: Yup.array().required(
  //   'This field must contain at least one contact.'
  // ),
  // .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  formControl: {
    marginLeft: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function ComposeMessage() {
  // Compose message state
  const [characterCount, setCharacterCount] = useState(0);
  const [errorPhone,setErrorPhone] = useState(false)

  // Messages UI Context
  const messagesUIContext = useCustomersUIContext();
  const messagesUIProps = useMemo(() => {
    return {
      composeMessage: messagesUIContext.composeMessage,
      setComposeMessage: messagesUIContext.setComposeMessage,
      contacts: messagesUIContext.contacts,
      $setContactNumbers: messagesUIContext.$setContactNumbers,
      contactsNumbers: messagesUIContext.contactsNumbers,
      uiTemplates: messagesUIContext.uiTemplates,
      setUITemplates: messagesUIContext.setUITemplates,
      queryParams: messagesUIContext.queryParams,
      newCustomerButtonClick: messagesUIContext.newCustomerButtonClick,
    };
  }, [messagesUIContext]);

  // Messages Redux state
  const dispatch = useDispatch();
  const {
    user,
    actionsLoading,
    error,
    agencyForEdit,
  } = useSelector(
    (state) => ({
      user: state.auth.user,
      actionsLoading: state.composeMessages.actionsLoading,
      error: state.composeMessages.error,
      contactEntities: state.contacts.entities,
      agencyForEdit: state.agencies.agencyForEdit,
    }),
    shallowEqual
  );

  const { senderIds } = agencyForEdit ? agencyForEdit : [];

  useEffect(() => {
    // server call for getting all contacts
    // dispatch(
    //   actions.fetchCustomers({
    //     ...messagesUIProps.queryParams,
    //     agency: user.groupId._id,
    //   })
    // );
    // server call for getting single agency by id
    dispatch(agencyActions.fetchCustomer(user.groupId._id));
  }, [dispatch]);

  const classes = useStyles();

  const history = useHistory();
  const [selectedSenderId,setSelectedSenderId] = useState('');

  // Redirect back to compose page after a message is being created
  const onHide = () => history.push('/user/compose');

  // Clear both the contacts and message fields
  const handleClearInputs = () => {
    messagesUIProps.setComposeMessage('');
  };

  // server request for saving message
  const saveMessage = (message) => {
    // server request for creating message
    dispatch(messageActions.createCustomer(message)).then((response) => {
      handleAxiosResponse(response,'Message created successfully', 'Oops unable to create message', dispatch,onHide);
     
    });
  };

  const {messages,per_message,length} = SmsCounter.count(messagesUIProps.composeMessage);

 
  const initValues = {
    contacts: messagesUIProps.contacts,
    message: messagesUIProps.composeMessage,
    sender: '',
    groupId: user.groupId._id,
    scheduleDate: '',
  };

  return (
    <div className={classes.root}>
      <Formik
        enableReinitialize={true}
        initialValues={initValues}
        validationSchema={ComposeMessageSchema}
        onSubmit={(values, { resetForm }) => {
          let _values = { ...values };
          _values.contacts = messagesUIProps.contactsNumbers.map((contact)=> contact)
          if(values.scheduleDate){
            _values.scheduleDate = new Date(_values.scheduleDate).toString()
          }
          saveMessage(_values);
          messagesUIProps.setComposeMessage('');
          messagesUIProps.$setContactNumbers([]);
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
          isValid,
          dirty,
        }) => (
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
            <Form className="form form-label-right">
              <div className="row">
                {/* Contacts Input Field */}
                <div className="form-group col-lg-12">
                  <div className="d-flex">
                    <div className="d-flex flex-column mr-5">
                      <span className="font-weight-bold">To:</span>
                      <span className="text-muted">
                        {messagesUIProps.contacts && messagesUIProps.contacts.length > 0
                          ? messagesUIProps.contacts.length
                          : 0}{' '}
                        recipients
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <Autocomplete
                        multiple 
                        id="tags-filled"
                        value={messagesUIProps.contactsNumbers}
                        freeSolo
                        options={[]}
                        onChange={(event, value,) => {
                          if(event.target.value === undefined){
                            setErrorPhone(false)
                            return messagesUIProps.$setContactNumbers(value);

                          }
                          const phone = parsePhoneNumber(event.target.value);
                          if(phone){
                            if(phone.isValid()){
                               value.pop();
                               value.push(phone.formatInternational().split(' ').join(''))
                               messagesUIProps.$setContactNumbers(value);
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
                          />
                        )}
                      />
                      {errors.contacts && touched.contacts ? (
                        <div className="text-danger">{errors.contacts}</div>
                      ) : null}
                    </div>
                    <div>
                      <FormControl
                        variant="filled"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="filled-age-native-simple">
                          SenderIDs
                        </InputLabel>
                        <Select
                          native
                          value={selectedSenderId}
                          name="sender"
                          variant="outlined"
                          onChange={(e) =>
                            {setFieldValue('sender', e.target.value);
                            setSelectedSenderId(e.target.value)
                          }
                          }
                          inputProps={{
                            name: 'sender',
                            id: 'filled-age-native-simple',
                          }}
                        >
                          <option aria-label="None" value="" />
                          {senderIds &&
                            senderIds.length > 0 &&
                            senderIds.map((senderId) => (
                              <option key={senderId._id} value={senderId._id}>
                                {senderId.name}
                              </option>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                {/* Messages Textarea */}
                <div className="form-group col-lg-12">
                  <div className="d-flex">
                    <div className="d-flex flex-column mr-5">
                      <span className="font-weight-bold">Message:</span>
                      <span className="text-muted">
                        <strong>{length}</strong>/{messages*per_message}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <div
                        className="d-flex justify-content-between py-2"
                        style={{ backgroundColor: '#f2f2f2', height: 38 }}
                      >
                        {/* <div className="ml-4">
                          <span className="font-weight-bold">Template: </span>
                          <span className="mr-1">
                            <Button
                              color="secondary"
                              variant="outlined"
                              size="small"
                              onClick={messagesUIProps.newCustomerButtonClick}
                              startIcon={<InsertDriveFileIcon />}
                            >
                              Insert
                            </Button>
                          </span>
                          
                        </div> */}
                        <div className="mr-4">
                          
                        </div>
                      </div>
                      
                      <textarea
                        style={{ borderRadius: 0 }}
                        name="message"
                        className="form-control"
                        placeholder="Enter Your Message here..."
                        value={messagesUIProps.composeMessage}
                        rows="5"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          
                          messagesUIProps.setComposeMessage(e.target.value);
                          setCharacterCount(e.target.value.length);
                        }}
                      ></textarea>
                     {
                        messages > 1 && (
                          <div className="mt-2 text-warning d-flex align-items-center">
                              <ErrorIcon/>
                              <span>
                                Long message ({messages} part)
                              </span>
                          </div>
                        )
                      }
                      {errors.message && touched.message ? (
                        <div className="text-danger">{errors.message}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end form-group col-lg-12">
                  <div className="d-flex justify-content-between label label-lg label-light-primary label-inline font-weight-bold py-5">
                    <span style={{ fontSize: 14 }} className="mr-5">
                      Cost estimate:
                    </span>
                    <span style={{ fontSize: 14 }}>0.00 credits</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between form-group col-lg-12">
                  <div>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<CancelIcon />}
                      onClick={handleClearInputs}
                      style={{
                        color: '#7E8299',
                        backgroundColor: '#F3F6F9',
                        borderColor: '#F3F6F9',
                      }}
                    >
                      Discard
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <TextField
                      id="datetime-local"
                      label="Schedule Date & Time"
                      type="datetime-local"
                      variant="outlined"
                      value={values.scheduleDate}
                      onChange={(e) =>
                        setFieldValue('scheduleDate', e.target.value)
                      }
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                 
                    <Button
                      variant="contained"
                      disabled={ !values.message || messagesUIProps.contactsNumbers.length === 0}
                      onClick={handleSubmit}
                      color="secondary"
                      size="large"
                      startIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
