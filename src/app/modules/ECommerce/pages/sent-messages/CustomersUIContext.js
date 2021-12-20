import React, { createContext, useContext, useState, useCallback } from 'react';
import { isEqual, isFunction } from 'lodash';
import { initialFilter } from './CustomersUIHelpers';

const CustomersUIContext = createContext();

export function useCustomersUIContext() {
  return useContext(CustomersUIContext);
}

export const CustomersUIConsumer = CustomersUIContext.Consumer;

export function CustomersUIProvider({ customersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [message,setMessage] = useState();
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initMessage = {
    message: '',
    scheduleDate: '',
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initMessage,
    message,
    newCustomerButtonClick: customersUIEvents.newCustomerButtonClick,
    openEditCustomerDialog: customersUIEvents.openEditCustomerDialog,
    openSendMessageCustomerDialog:(id,$message)=>{
      setMessage($message)
      return customersUIEvents.openSendMessageCustomerDialog(id)
    },
    openDeleteCustomerDialog: customersUIEvents.openDeleteCustomerDialog,
    openDeleteCustomersDialog: customersUIEvents.openDeleteCustomersDialog,
    openFetchCustomersDialog: customersUIEvents.openFetchCustomersDialog,
    openUpdateCustomersStatusDialog:
      customersUIEvents.openUpdateCustomersStatusDialog,
  };

  return (
    <CustomersUIContext.Provider value={value}>
      {children}
    </CustomersUIContext.Provider>
  );
}
