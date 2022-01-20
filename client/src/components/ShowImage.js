import React, {useEffect, useState} from "react";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';

const ShowImage = (props) => {
  const {showImageModal, setShowImageModal, deleteImage, image} = props
  console.log(image)
  const handleClose = () => setShowImageModal(false);

  const handleDelete = () => {
    deleteImage(image.photo_id)
    setShowImageModal(false)
  }

  return (
    <>
      <Modal show={showImageModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body><img src = {image.pointer} alt = "image" style={{maxWidth:"200px"}}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ShowImage;