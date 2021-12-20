import React, { useMemo } from 'react';
import { useCustomersUIContext } from '../CustomersUIContext';

export function CustomersGrouping() {
  // Contacts UI Context
  const contactsUIContext = useCustomersUIContext();
  const contactsUIProps = useMemo(() => {
    return {
      ids: contactsUIContext.ids,
      setIds: contactsUIContext.setIds,
      openDeleteCustomersDialog: contactsUIContext.openDeleteCustomersDialog,
      openFetchCustomersDialog: contactsUIContext.openFetchCustomersDialog,
      openUpdateCustomersStatusDialog:
        contactsUIContext.openUpdateCustomersStatusDialog,
    };
  }, [contactsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{contactsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={contactsUIProps.openDeleteCustomersDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={contactsUIProps.openFetchCustomersDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              {/* <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={contactsUIProps.openUpdateCustomersStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
