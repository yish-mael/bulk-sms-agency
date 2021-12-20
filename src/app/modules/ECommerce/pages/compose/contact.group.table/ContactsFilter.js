import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { values } from 'lodash-es';
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
function ContactsFilter({ contacts, contactsInContext, setContactsInContext }) {
  //   const [selectedContacts, setSelectedContacts] = useState([]);
  return (
    <div>
      <Autocomplete
        id="tags-outlined"
        options={contacts && contacts.length > 0 ? contacts : []}
        getOptionLabel={(option) => `${option.name}`}
        filterSelectedOptions
        onChange={(event, value) => {
          setContactsInContext(value.contacts);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            name="senderIds"
            variant="outlined"
            label="Search & Select Contacts"
            placeholder="Enter contacts"
            fullWidth
          />
        )}
        fullWidth
      />
    </div>
  );
}

export default ContactsFilter;
