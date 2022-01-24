import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { SecondaryColor } from "./Styles";

const ShowImage = (props) => {
  const {
    showImageModal,
    setShowImageModal,
    deleteImage,
    image,
    imagePointer,
  } = props;
  const [deletable, setDeletable] = useState(
    props.deletable === false ? false : true
  );
  console.log(imagePointer);
  console.log(image);
  console.log(image.photo_id);
  const handleClose = () => setShowImageModal(false);

  const handleDelete = () => {
    deleteImage(image.photo_id);
    setShowImageModal(false);
  };

  return (
    <>
      <Modal show={showImageModal} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: `${SecondaryColor}`, color: "white" }}
        >
          <Modal.Title>View Image</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: `${SecondaryColor}`, color: "white" }}
        >
          <img src={image.pointer} alt='image' style={{ maxWidth: "200px" }} />
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: `${SecondaryColor}`, color: "white" }}
        >
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          {deletable && (
            <Button variant='primary' onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowImage;
