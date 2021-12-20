// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from 'react';

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = (status) => {
    let cssLabelClass;
    switch (status) {
      case 'APPROVED':
        cssLabelClass = 'primary';
        break;

      case 'PENDING':
        cssLabelClass = 'warning';
        break;

      case 'SENT':
        cssLabelClass = 'success';
        break;

      default:
        cssLabelClass = 'primary';
    }
    return `label label-lg label-light-${cssLabelClass} label-inline text-dark font-weight-bold`;
  };
  return <span className={getLabelCssClasses(row.status)}>{row.status}</span>;
}

export function RecipientsColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    // const cssLabelClass = row.active ? 'success' : 'danger';
    const cssLabelClass = 'secondary';
    return `label label-lg label-light-${cssLabelClass} label-inline text-white font-weight-bold d-flex`;
  };
  return (
    <span style={{ backgroundColor: 'gray' }} className={getLabelCssClasses()}>
      <span className="mr-1">{row.contacts.length}</span>
      <span>{row.contacts.length > 1 ? ' Recipients' : ' Recipient'}</span>
    </span>
  );
}
