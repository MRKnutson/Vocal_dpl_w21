import React from "react";
import { Modal } from "react-bootstrap";
import { SecondaryColor, VocalButton, ViewButton } from "./Styles";

const DeleteRecordingModal = (props) => {
  const { show, setShow, recording, deleteRecording } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
      centered={true}
      size='md'
      focus={true}
    >
      <Modal.Body
        style={{
          backgroundColor: `${SecondaryColor}`,
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem",
          height: "12rem",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
        }}
      >
        <Modal.Header>
          Are you sure you would like to delete this recording? This cannot be
          undone.
        </Modal.Header>
        <Modal.Footer>
          <ViewButton onClick={handleClose}>Cancel</ViewButton>
          <ViewButton onClick={(e) => {
            deleteRecording(recording.id, e)
          }}>
            Delete Recording
          </ViewButton>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteRecordingModal;
