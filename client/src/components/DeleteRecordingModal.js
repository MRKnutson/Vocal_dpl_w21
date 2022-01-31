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
      size='lg'
    >
      <Modal.Body
        style={{
          backgroundColor: `${SecondaryColor}`,
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem",
          height: "35rem",
        }}
      >
        <Modal.Header>
          Are you sure you would like to delete this recording? This can not be
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
