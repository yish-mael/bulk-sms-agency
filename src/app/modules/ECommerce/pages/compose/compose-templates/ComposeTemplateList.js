import React, { useMemo } from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useCustomersUIContext } from '../CustomersUIContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  inline: {
    display: 'inline',
  },
}));

export default function ComposeTemplateList({
  uiTemplates,
  removeTemplate,
  onHide,
  setComposeMessage
}) {
  // Compose UI Context
  const composeUIContext = useCustomersUIContext();
  const composeUIProps = useMemo(
    () => ({
      openDeleteCustomerDialog: composeUIContext.openDeleteCustomerDialog,
    }),
    [composeUIContext]
  );

  const classes = useStyles();

  return (
    <>
      <Modal.Body className="overlay overlay-block cursor-default">
        <List className={classes.root}>
          {uiTemplates.map((template) => (
            <div key={template.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div onClick={()=> setComposeMessage(template.message)}>
                  <ListItem alignItems="flex-start">
                    <ListItemText primary={template.message} />
                  </ListItem>
                </div>

                <div>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`delete-template-tooltip`}>
                        Delete <strong>template</strong>.
                      </Tooltip>
                    }
                  >
                    <Delete
                      onClick={() => removeTemplate(template.id)}
                      style={{ color: 'red', cursor: 'pointer' }}
                    />
                  </OverlayTrigger>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </List>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-elevate"
        >
          Cancel
        </button>
      </Modal.Footer>
    </>
  );
}
