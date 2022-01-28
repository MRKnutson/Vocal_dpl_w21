import React from "react";
import { Modal } from "react-bootstrap";
import { SecondaryColor, VocalButton, ViewButton } from "./Styles";

const DeleteUserModal = (props) => {
  const { show, setShow, id, deleteUser } = props;

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
        }}
      >
        <h5>
          Are you sure you would like to delete account? All associated data
          will be lost.
        </h5>
        <Modal.Footer>
          <ViewButton onClick={handleClose}>Cancel Delete</ViewButton>
          <ViewButton onClick={() => deleteUser(id)}>Delete Account</ViewButton>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUserModal;
