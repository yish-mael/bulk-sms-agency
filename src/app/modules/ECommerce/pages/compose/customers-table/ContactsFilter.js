import React, { useState } from 'react';
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
function ContactsFilter({ contacts, contactsInContext, setContactsInContext }) {
  //   const [selectedContacts, setSelectedContacts] = useState([]);
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={contacts && contacts.length > 0 ? contacts : []}
        getOptionLabel={(option) => `${option.name}`}
        filterOptions={(options,state) => {
          const $options = options.filter((opt) => {
            let include = true;
            contactsInContext.forEach((contact) => {
              if (contact.id === opt.id) {
                include = false;
              }
            });
            return include;
          });
          const filteredBySearch = customSearch($options,state.inputValue)
          return filteredBySearch;
        }}
        value={contactsInContext}
        filterSelectedOptions
        onChange={(event, value) => {
          setContactsInContext(value);
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
