import * as moment from 'moment';
import {setSnackbar} from '../snackbar/snackbarActions';
import React from 'react';


function ContainInvalidMessageInput(message){
    const notAllowedCharacters = ["^","{","}","[","~","]","|","€"];
    let containCharacterNotAllowed = false;
    notAllowedCharacters.forEach((char)=>{
      let search = message.indexOf(char);
      if(search >= 0){
        containCharacterNotAllowed = true;
      }
    })
    return containCharacterNotAllowed
}

const formatPayloadArr = (payload) => {
  const _payload = [];
  payload.forEach((obj) => {
    obj.id = obj._id;
    delete obj._id;
    _payload.push(obj);
  });
  return _payload;
};


function checkResponseData(response){
  if(typeof response === 'object'){

    if(response.hasOwnProperty('data')){
      return response;
    }

    if(response.hasOwnProperty('response')){
      return response.response;
    }
    
  }
}

/**
 * 
 * @param response response gotten from any axios request
 * @param {*} snackSuccess success message to display to user if request ends with 200 status code
 * @param {*} snackError error message to display to user if request ends with response code other than 200
 * @param {*} dispatch pass the dispatch function that will be available to the function parent
 * @returns {Boolean} Returns if this function evaluate the request to be OK or not
 */
export function handleAxiosResponse(response,snackSuccess,snackError,dispatch,hideModal=null){
    const checkResponse = checkResponseData(response);
    let isSuccess = false;
    let messageError = response.message ? response.message : '';
    if(checkResponse){
      const {status,data} = checkResponseData(response);
      const {message} = data;
      isSuccess = status === 200;
      messageError = message;
      console.log(message);
      if(isSuccess){
        if(hideModal) hideModal();
      };
    }
    
    dispatch(setSnackbar({ 
      status: isSuccess ? 'success' : 'error',
      message: (
        <p style={{ fontSize: '16px' }}>
          {isSuccess ? snackSuccess : messageError}
        </p>
      ),
      show: true,
    }))

    return isSuccess;
}

const formatPayloadObj = (payload) => {
  payload.id = payload._id;
  delete payload._id;
  return payload;
};

const formatRolesPayload = (payload) => {
  const _payload = [];
  payload.forEach((obj) => {
    obj.id = obj._id;
    obj.sendMessage
      ? (obj._sendMessage = 'Allowed')
      : (obj._sendMessage = 'Not Allowed');
    obj.readMessage
      ? (obj._readMessage = 'Allowed')
      : (obj._readMessage = 'Not Allowed');
    obj.addContact
      ? (obj._addContact = 'Allowed')
      : (obj._addContact = 'Not Allowed');
    delete obj._id;
    _payload.push(obj);
  });
  return _payload;
};

const formatRolePayload = (payload) => {
  let _payload = { ...payload };
  _payload.id = _payload._id;
  _payload.sendMessage
    ? (_payload._sendMessage = 'Allowed')
    : (_payload._sendMessage = 'Not Allowed');
  _payload.readMessage
    ? (_payload._readMessage = 'Allowed')
    : (_payload._readMessage = 'Not Allowed');
  _payload.addContact
    ? (_payload._addContact = 'Allowed')
    : (_payload._addContact = 'Not Allowed');
  delete _payload._id;

  return _payload;
};

const formatUsersPayload = (payload) => {
  const _payload = [];
  payload.forEach((obj) => {
    let _obj = { ...obj };

    _obj.id = _obj._id;
    _obj.roleName = _obj.roleId ? _obj.roleId.name : '';
    _obj.groupName = _obj.groupId ? _obj.groupId.name : '';
    _obj.active ? (_obj.status = 'Activated') : (_obj.status = 'Deactivated');
    delete _obj._id;
    _payload.push(_obj);
  });
  return _payload;
};

const formatReportsPayloadArr = (payload) => {
  const _payload = [];
  payload.forEach((obj) => {
    let _obj = { ...obj };

    _obj.id = _obj._id;
    _obj.fullName = _obj.employeeId ? _obj.employeeId.name : '';
    _obj.email = _obj.employeeId ? _obj.employeeId.email : '';
    delete _obj._id;
    _payload.push(_obj);
  });
  return _payload;
};

const formatComposedMessagePayload = (payload) => {
  payload.id = payload._id;
  payload.date = moment(new Date(payload.date)).format('LLL') 
  delete payload._id;
  return payload;
};

const formatComposedMessagesPayload = (payload) => {
  console.log(payload)
  const _payload = [];
  payload.forEach((obj) => {
    let _obj = { ...obj };
    _obj.id = _obj._id;
    _obj.date = moment(new Date(_obj.date)).format('LLL')
    delete _obj._id;

    _payload.push(_obj);
  });
  return _payload;
};






export const formatActivitiesPayload = (payload) => {
  const _payload = [];
  payload.forEach((obj) => {
    let _obj = { ...obj };

    _obj.id = _obj._id;
    if (_obj.admin && _obj.userType === 'ADMIN-ACCOUNT') {
      _obj.name = _obj.admin.name;
      _obj.email = _obj.admin.email;
      _obj.date = moment(new Date(_obj.date)).format('LLL')
      _obj.type = _obj.type;
    } else if (_obj.user) {
      _obj.name = _obj.user.name;
      _obj.email = _obj.user.email;
      _obj.date = moment(new Date(_obj.date)).format('LLL')
      _obj.type = _obj.type;
    }
    try {
      _obj.date = new Date(_obj.date);
      _obj.date = moment(new Date(_obj.date)).format('LLL')
    } catch (e) {
      console.log(e.message);
    }
    delete _obj._id;
    _payload.push(_obj);
  });
  return _payload;
};

export const formatUserPayloadObj = (payload) => {
  let _payload = { ...payload };
  _payload.id = _payload._id;
  _payload._roleId = _payload.roleId ? _payload.roleId._id : '';
  _payload.roleName = _payload.roleId ? _payload.roleId.name : '';
  _payload._groupId = _payload.groupId ? _payload.groupId._id : '';
  _payload.groupName = _payload.groupId ? _payload.groupId.name : '';
  _payload.active
    ? (_payload.status = 'Activated')
    : (_payload.status = 'Deactivated');
  delete _payload._id;
  return _payload;
};


const formatReportsPayload = (payload) => {
  const response = [...payload];
  const _payload = [];
  response.forEach((obj) => {
    let _obj = { ...obj };

    _obj.id = _obj._id;
    _obj.name = _obj.employeeId.name;
    _obj.agency = _obj.groupId.name;
    _obj.date = new Date(_obj.date);
    try {
      _obj.date = moment(_obj.date).format('YYYY-MM-DD HH:mm:ss');
    } catch (e) {
      console.log(e);
    }
    _payload.push(_obj);

    delete _obj._id;
  });
  return _payload;
};



export default {
  formatPayloadArr,
  formatPayloadObj,
  formatRolesPayload,
  formatRolePayload,
  formatUsersPayload,
  formatReportsPayloadArr,
  formatComposedMessagePayload,
  formatComposedMessagesPayload,

  formatUserPayloadObj,
  formatActivitiesPayload,
  formatReportsPayload,
};





