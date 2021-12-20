// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from 'react';
import {
  CustomerTypeCssClasses,
  CustomerTypeTitles,
} from '../../CustomersUIHelpers';

export function getLabelCssClasses(type) {
  let cssClass;

  switch (type) {
    case 'CREATE':
      cssClass = 'primary';
      break;

    case 'UPDATE':
      cssClass = 'warning';
      break;

    case 'DELETE':
      cssClass = 'danger';
      break;

    case 'LOGIN':
      cssClass = 'success';
      break;

    default:
      cssClass = 'primary';
  }
  return cssClass;
}
export function TypeColumnFormatter(cellContent, row) {
  console.log(row.type)
  return (
    <span
      className={`label label-lg label-light-${getLabelCssClasses(
        row.type
      )} label-inline font-weight-bold py-3`}
    >
      {row.type}
    </span>
  );
}
