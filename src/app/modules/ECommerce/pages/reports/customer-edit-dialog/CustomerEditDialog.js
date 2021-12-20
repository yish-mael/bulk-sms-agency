import React, { useEffect, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../_redux/reports/reportsActions';
import { CustomerEditDialogHeader } from './CustomerEditDialogHeader';
import { CustomerEditForm } from './CustomerEditForm';
import { useCustomersUIContext } from '../CustomersUIContext';
import { setSnackbar } from '../../../_redux/snackbar/snackbarActions';
import { handleAxiosResponse } from '../../../_redux/utils/helperFuncs';

export function CustomerEditDialog({ id, show, onHide }) {
  // Reports UI Context
  const reportsUIContext = useCustomersUIContext();
  const reportsUIProps = useMemo(() => {
    return {
      initReport: reportsUIContext.initReport,
      queryParams: reportsUIContext.queryParams,
    };
  }, [reportsUIContext]);

  // Reports Redux state
  const dispatch = useDispatch();
  const { actionsLoading, error, user, reportForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.reports.actionsLoading,
      error: state.reports.error,
      user: state.auth.user,
      reportForEdit: state.reports.reportForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Report by id
    dispatch(actions.fetchCustomer(id));
  }, [id, dispatch]);

  // server request for saving report
  const sendReport = (report) => {
    if (!id) {
      // server request for creating report
      
      dispatch(actions.createCustomer(report)).then((response) => {
        handleAxiosResponse(response,'Report created successfully', 'Oops unable to create report', dispatch,onHide);

      });
    } else {
      // server request for updating a report
      dispatch(actions.updateCustomer(report)).then((response) => {
        
        handleAxiosResponse(response,'Report created successfully', 'Oops unable to create report', dispatch,onHide);

      });
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CustomerEditDialogHeader id={id} />
      <CustomerEditForm
        sendReport={sendReport}
        actionsLoading={actionsLoading}
        report={
          reportForEdit || {
            ...reportsUIProps.initReport,
            employeeId: user._id,
            groupId: user.groupId?._id,
          }
        }
        onHide={onHide}
      />
    </Modal>
  );
}
