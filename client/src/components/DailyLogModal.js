import React from "react";
import { Modal } from "react-bootstrap";
import { SecondaryColor, ViewButton, VocalHeader } from "./Styles";

const DailyLogModal = ({
  recording,
  images,
  show,
  setShow,
  formatDate,
  formatTime,
}) => {
  const handleClose = () => {
    setShow(false);
  };

  const renderImages = () => {
    if (images) {
      return images.map((i) => {
        return (
          <>
            <img src={i.pointer} style={{ width: "10rem", margin: "0.5rem" }} />
          </>
        );
      });
    }
  };

  return (
    <Modal
      show={show}
      backdrop='static'
      keyboard={false}
      size='lg'
      centered={true}
    >
      <Modal.Body
        style={{
          backgroundColor: `${SecondaryColor}`,
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem",
        }}
      >
        <ViewButton onClick={handleClose}>Close</ViewButton>
        <VocalHeader
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          {recording.title}
        </VocalHeader>
        <div>
          <div style={{ margin: "auto" }}>
            <h6>Length: {recording.duration} seconds</h6>
            <h6>Date: {formatDate(recording.created_at)}</h6>
            <h6>Time: {formatTime(recording.created_at)}</h6>
          </div>
          <h6>Notes: </h6>
          <p style={{ marginLeft: "20px" }}>{recording.notes}</p>
          {images && renderImages()}
          <br />
          <audio
            src={recording.pointer}
            controls
            style={{ height: "35px", margin: "auto" }}
          />
          <br />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DailyLogModal;
