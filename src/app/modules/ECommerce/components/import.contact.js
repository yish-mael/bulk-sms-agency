import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../_redux/contactsGroup/contactsActions';
import {ListItem,ListItemText,ListItemAvatar,Avatar,Button,TextField,Radio,LinearProgress} from '@material-ui/core'
import {Description,FileCopy,CheckCircle} from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Xls from 'xlsx';
import parsePhoneNumber,{isSupportedCountry} from 'libphonenumber-js'
import BootstrapTable from 'react-bootstrap-table-next';
import * as contactAction from '../_redux/contacts/contactsActions';
import * as contactGroupAction from '../_redux/contactsGroup/contactsActions';
import { handleAxiosResponse } from '../_redux/utils/helperFuncs';

export function ImportContact({cancel,onFinish,uploadContact}) {

  const [file,setFileSelected] = useState();
  const [inputState,setInputState] = useState({group:false,new:true,none:true});
  const [Next,setNext] = useState(false);
  const [contacts,setContacts] = useState([]);
  const [selectedGroup,setGroup] = useState({contacts:[],id:''});
  const [groupName,setGroupName] = useState('');
  const [uploading,setUploading] = useState(false);
  const [uploadState,setUploadState] = useState('Uploading Contacts');
  const [uploadDone,setUploadDone] = useState(false);

   // Users UI Context
 
   const {user, currentState } = useSelector(
    (state) => ({
      error: state.composeMessages.error,
      user: state.auth.user,
      currentState: state.contactsGroup,

    }),
    shallowEqual
  );

   const columns = [
    {
      dataField: 'name',
      text: 'Full Name',
    },
    {
      dataField: 'number',
      text: 'Phone Number',
    },
    {
      dataField: 'countryCode',
      text: 'country code'
    },
  ];

  const cannotGoNext = ()=> {
     
      if(!uploadContact && file){
        return false;
      }


      if(!inputState.group){
         if(selectedGroup.contacts.length  > 0 && file){
             return false;
         }
         return true;
      }

      if(!inputState.new){
          if(groupName.trim() && file){
              return false;
          }else{
              return true;
          }
      }

      if(!inputState.none && file){
         return false;
      }

      return true;

  }

  const handleConvertContactToObject = (contactArr)=>{
    // validating and converting numbers to correct format
    const finalFormat = [];
    contactArr.forEach((item)=>{
        let [phoneNumber,countryShortName,FirstName,LastName] = item;
        if(countryShortName && phoneNumber){
            const country = countryShortName.toUpperCase();
            if(isSupportedCountry(country)){
                const phone = parsePhoneNumber(phoneNumber.toString(),countryShortName.toUpperCase());
                if(phone){
                    finalFormat.push({
                        name:FirstName + ' ' + LastName,
                        countryCode: country,
                        groupId: user.groupId?._id,
                        number: phone.formatNational().split(' ').join(''),
                    })
                }
            }
        }
        
    })
    return finalFormat;
  }

  // Users Redux state
  const dispatch = useDispatch();
  


  const handleSelectedFile = async (e) => {
    e.preventDefault()
    setFileSelected(e.target.files[0])
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      const wb = Xls.read(text,{type:'array'});
      const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = Xls.utils.sheet_to_json(ws, {header:1});
            const finalDoc = handleConvertContactToObject(data);
            setContacts(finalDoc)
            
    };
    reader.readAsArrayBuffer(e.target.files[0])
  }
  
  const { totalCount, allContactGroups, listLoading } = currentState;

  const handleNext = async()=>{
      let newContacts, newGroup;
      if(Next){

          if(!uploadContact){
             return onFinish(contacts)
          }

          setUploading(true);

          if(uploadContact){
            // lets upload some contact and add to group
              try{
                const response =  await dispatch(contactAction.createCustomer(contacts));
                console.log(response)
                const handler = handleAxiosResponse(response,'Contacts created successfully', 'Oops unable to create contacts', dispatch);  
                if(!handler) return setUploading(false);
                const contactIDs = response.data.extraPayload.map(($contact)=> $contact._id);
                newContacts = contactIDs;
              }catch(e){
                console.log(e)
              }
              
          }

          

          if(!inputState.new){
              // lets upload some contact and add to group
              setUploadState('Creating new contact group')
              const response =  await dispatch(contactGroupAction.createCustomer({
                name:groupName,
                groupId: user.groupId?._id,
              }));
              const handler = handleAxiosResponse(response,'Contact group created successfully', 'Oops unable to create contact group', dispatch);  
              if(!handler) return setUploading(false);
              newGroup = response.data.payload;
              
              // lets update the new group with
          }

          if(!inputState.group || !inputState.new){
    
            setUploadState('importing to contact group')
              const response =  await dispatch(contactGroupAction.updateCustomer({
                id: newGroup ? newGroup.id : selectedGroup.id,
                contacts:newGroup? newContacts : [...selectedGroup.contacts.map((data)=>data._id),...newContacts],
                name: newGroup ? newGroup.name : selectedGroup.name
                
              }));
              const handler = handleAxiosResponse(response,'Contacts added to group successfully', 'Oops unable to add contact to group', dispatch);  
              if(!handler) return setUploading(false);
              console.log(response)
          }
          
          setUploadDone(true);
          setUploading(false);
          
          // upload contact and do other commands here before dismissing or returning control to caller
          // return onFinish(contacts)
          // setUploading(true);

          return 
      }
      setNext(true);
  }

  useEffect(()=>{
    dispatch(
        actions.fetchUpaginatedCustomers({
          agency: user.groupId?._id,
          pageSize: 10000, 
          pageNumber: 1
        })
      );
  },[dispatch])

  
  if(uploading){
   return <div className="mx-5  pb-5" style={{height: 400}}>
        <div style={{height: 150}}/>
        <h3 style={{textAlign:'center', marginBottom: 30}}>
          {uploadState} ...
        </h3>
        <LinearProgress/>

    </div>
  }

  if(uploadDone){
    return <div className="mx-5  pb-5 text-center" style={{height: 400}}>
         <div style={{height: 100}}/>

         <CheckCircle style={{fontSize: 60, textAlign:'center',marginBottom:20}} color="primary"/>
         <h3 style={{textAlign:'center'}}>
           Contacts Imported Successfully !!! 
         </h3>
         <div style={{height: 100}}/>

         <div  className="d-flex p-4" style={{justifyContent:'flex-end'}}>
            
           
           <Button onClick={()=>onFinish(contacts)} className="ml-2" size="large" color="secondary" variant="contained">
               
               Done
           </Button>


        </div>
     </div>
   }
 

  if(Next){
       return <>
         <div className="mx-5 mt-4 pb-5" style={{height: 400,overflowY:'scroll',overflowX:'hidden'}}>
           <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="_id"
                data={contacts}
                columns={columns}
             />
               
       </div>
       <div  className="d-flex p-4" style={{justifyContent:'flex-end'}}>
            
             <Button onClick={()=>cancel()} className="btn btn-outline-primary" size="large" color="secondary" variant="outlined">
                
                Cancel
            </Button>

            <Button onClick={handleNext} className="ml-2" size="large" color="secondary" variant="contained">
                
                Next
            </Button>


         </div>
       </>
  }
 

 
  return (
   
      <div className="mx-5 mt-4 pb-5">
       <h3>1. Choose File</h3>
       <p>Contacts can be imported from one of the below file types. Please include the <b>mobile number</b>,<b>two digit short name of numbers country</b>, <b>first name</b> and <b>last name</b> of each of your contacts.</p>
       <p><b>Example</b> <br/>08105007355,ng,Mathew,James <br/> 08105007345,us,Rim,Tide</p>
       <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FileCopy />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Excel (*.xlsx | *.xls)" secondary="One contact per row, data as text separated into columns." />
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Description />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="CSV, TXT (*.csv | *.txt)" secondary="One contact per row, data as text separated by commas (.csv or .txt) or tab spaces (.txt)" />
      </ListItem>
      
      <div className="d-flex align-items-center"> 
        <label  htmlFor="choose-file">
            <input accept=".xlsx, .xls, .csv, .txt, text/plain)" onChange={(e)=> handleSelectedFile(e)} className="d-none" type="file" id="choose-file"/>
            <Button disabled className="btn btn-outline-primary" size="large" color="secondary" variant="outlined">
                
                {!file?"Choose file":"Change file"}
            </Button>
        </label>
        <p style={{fontWeight:'bold'}} className="text-primary ml-3">
            {file? file.name : ''}
        </p>
      </div>



         {
           uploadContact && (
             <>
                   <h3 className="mt-4">2. Select Contact Group(s) To Import Into</h3>

                <div className="mt-3">
                        <div className="d-flex align-items-center"> 
                          <Radio checked={!inputState.group} onChange={()=> setInputState({
                              group:false,new:true,none:true
                          })}/> 
                          <span>Import to Existing Groups</span>
                        </div>
                          <Autocomplete
                            id="tags-outlined"
                            options={allContactGroups}
                            disabled={inputState.group}
                            getOptionLabel={(option) => `${option.name}`}
                            filterSelectedOptions
                            onChange={(event, value) => {
                              console.log(value)
                              setGroup(value);
                            }}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                name="senderIds"
                                variant="outlined"
                                label="Contact group"
                                placeholder="Enter contacts"
                            />
                            )}
                            fullWidth
                        />
                      </div>
                      

                      <div className="mt-3 ">
                                <div className="d-flex align-items-center"> 
                                <Radio checked={!inputState.new} onChange={()=> setInputState({
                              group:true,new:false,none:true
                          })}/> 
                                    <span>Import to New Group</span>
                                </div>         

                              <TextField
                                name="senderIds"
                                disabled={inputState.new}
                                variant="outlined"
                                label="New Group"
                                placeholder="Enter new group name"
                                fullWidth
                                onChange={(e)=>setGroupName(e.target.value)}
                            />
                      </div>
                          
                      <div className="mt-3">
                                <div className="d-flex align-items-center"> 
                                <Radio checked={!inputState.none} onChange={()=> setInputState({
                              group:true,new:true,none:false
                          })}/> 
                                    <span>Do not add to any group</span>
                                </div>         

                            
                      </div>
             </>
            )
         }
         <div  className="d-flex" style={{justifyContent:'flex-end'}}>
            
             <Button onClick={()=>cancel()} className="btn btn-outline-primary" size="large" color="secondary" variant="outlined">
                
                Cancel
            </Button>

            <Button disabled={cannotGoNext()} onClick={handleNext} className="ml-2" size="large" color="secondary" variant="contained">
                
                Next
            </Button>


         </div>
      </div>
  );
}
