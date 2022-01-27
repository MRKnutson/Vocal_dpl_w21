import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import RecordingImage from "../components/RecordingImage";
import {
  PrimaryColor,
  SecondaryColor,
  ActionColor,
  VocalHeader,
  VocalButton,
  ViewButton,
  HoverImage,
} from "../components/Styles.js";
import axios from "axios";
import ShowImage from "../components/ShowImage";
import EditRecordingForm from "./EditRecodingForm";

const ShowRecording = (props) => {
  const {
    handleClose,
    images,
    setImages,
    showImage,
    allImages,
    recordings,
    setRecordings,
    tags,
    getData
  } = props;

  const [recording, setRecording] = useState(props.recording);
  const [image, setImage] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  
  

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleImageModal = (photo) => {
    setModalImage(photo);
    setShowImageModal(true);
  };

  const renderImages = () => {
    console.log(images);
    return images.map((i) => {
      return (
        <>
          <HoverImage
            onClick={() => {
              handleImageModal(i);
            }}
            src={i.pointer}
            style={{ width: "10rem" }}
          />
          {showImageModal && modalImage && (
            <ShowImage
              showImageModal={showImageModal}
              setShowImageModal={setShowImageModal}
              deleteImage={deleteImage}
              image={modalImage}
            />
          )}
        </>
      );
    });
  };

  const deleteImage = async (id) => {
    let response = await axios.delete(
      `/api/recordings/${props.recording.id}/photos/${id}`
    );
    let filteredImages = allImages.filter((photo) => photo.photo_id !== id);
    setImages(filteredImages);
  };

  function refreshPage(){
    window.location.reload(false);
    };

  const handleDeleteRecording = async (id) => {
    try {
      let response = await axios.delete(`/api/recordings/${id}`);
      let filteredRecordings = recordings.filter((r) => r.id !== id);
      setRecordings(filteredRecordings);
      handleClose();
    } catch (err) {
      alert("error deleting recording");
    }
    refreshPage()
  };

  const formatTime = (created_at) => {
    let d = new Date(created_at);
    let hrs = d.getHours();
    let mins = d.getMinutes();
    if (hrs < 12) {
      if (mins < 10) {
        mins = "0" + mins;
      }
      let time = hrs + ":" + mins + " AM";
      return time;
    } else if (hrs < 13 && mins < 60) {
      if (mins < 10) {
        mins = "0" + mins;
      }
      let time = hrs + ":" + mins + " PM";
      return time;
    } else {
      if (mins < 10) {
        mins = "0" + mins;
      }
      let PMhrs = hrs - 12;
      let time = PMhrs + ":" + mins + " PM";
      return time;
    }
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("-");
  }

  
  return (
    <Modal
    show={1}
    backdrop='static'
    keyboard={false}
    size= "lg"
    centered={true}
    >
      <Modal.Body style ={{backgroundColor: `${SecondaryColor}`, color: "white", padding:"2rem", borderRadius:"1.5rem"}}>
      {!showEdit && <ViewButton onClick={handleClose}>Close</ViewButton>}
        {!showEdit && <VocalHeader style={{ textAlign: "center", marginTop:"2rem", marginBottom:"2rem" }}>
          {recording.title}
        </VocalHeader>}
        <div>
          {!showEdit && (
            <div style={{ margin: "auto" }}>
              <h6>Length: {recording.duration} seconds</h6>
              <h6>Date: {formatDate(recording.created_at)}
              </h6>
              <h6>Time: {formatTime(recording.created_at)}
              </h6>
            </div>
          )}
          {!showEdit && <h6>Notes: </h6>}
          {!showEdit && <p style={{ marginLeft: "20px" }}>{recording.notes}</p>}
          {!showEdit && (
            <p>Tags: {props.tags.map((t) => t.tag_text).join(", ")}</p>
            )}
          {images && renderImages()}
            <br/>
            <audio
              src={recording.pointer}
              controls
              style={{ height: "35px", margin: "auto" }}
            />
          {showUpload && (
            <RecordingImage
              toggleUpload={toggleUpload}
              setImages={setImages}
              allImages={allImages}
              images={images}
              recording_id={recording.id}
            />
          )}
          <br />
          {showEdit && (
            <EditRecordingForm
            toggleEdit={toggleEdit}
            recording={recording}
            setRecording={setRecording}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            recordings={recordings}
            setRecordings={setRecordings}
            tags={tags}
            getData={getData}
            />
          )}
          <div style={{marginTop:"2rem", display:"flex", justifyContent:"center"}}>
          {!showUpload && (
              <ViewButton style={{ marginRight: "1rem" }} onClick={toggleUpload}>
                Add Image
              </ViewButton>
            )}
          {!showEdit && (
            <ViewButton style={{ marginRight: "1rem" }} onClick={toggleEdit}>
              Edit Recording
            </ViewButton>
          )}
          {!showEdit && (
            <ViewButton onClick={() => handleDeleteRecording(recording.id)}>
              Delete Recording
            </ViewButton>
          )}
          </div>
        </div>
        {showEdit && <ViewButton onClick={toggleEdit}>Cancel</ViewButton>}
      </Modal.Body>
    </Modal>
  );
};
export default ShowRecording;
