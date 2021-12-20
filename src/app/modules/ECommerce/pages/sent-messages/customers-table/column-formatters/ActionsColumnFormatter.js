// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../../../_metronic/_helpers';
import SendIcon from '@material-ui/icons/Send';

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  {
    user,
    openSendMessageCustomerDialog,
    openEditCustomerDialog,
    openDeleteCustomerDialog,
  }
) {
  return (
    <div className="d-flex">
      {user && user.roleId.sendMessage && row.status === 'PENDING' && (
          <div
            title="Send Message"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openSendMessageCustomerDialog(row.id,row)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SendIcon
                color="secondary"
                className="btn btn-icon btn-hover-primary"
              />
            </span>
          </div>
      )}

      {
        row.status === "PENDING" && (
          <div
          title="Edit Message"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openEditCustomerDialog(row.id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
              title="Edit Message"
            />
          </span>
        </div>
  
        )
      }
      <div
        title="Delete Message"
        className="btn mx-auto btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteCustomerDialog(row.id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG
            src={toAbsoluteUrl('/media/svg/icons/General/Trash.svg')}
            title="Delete Message"
          />
        </span>
      </div>
    </div>
  );
}
