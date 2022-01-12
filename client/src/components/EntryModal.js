import React from 'react'
import { Button, Modal } from 'react-bootstrap';

const EntryModal = ({handleClose, handleSave, show}) => {
  return(
    <Modal
      show = {show}
      onHide = {handleClose}
      backdrop = "static"
      keyboard = {false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Journal Entry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This is where we are going to have our entry details form
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick = {handleClose}>
          Cancel
        </Button>
        <Button variant = "primary" onClick = {handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default EntryModal;