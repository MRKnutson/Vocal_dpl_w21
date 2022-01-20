import {useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
import RecordingImage from '../components/RecordingImage';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'
import axios from "axios";
import ShowImage from "../components/ShowImage";

const ShowRecording = (props) => {
    const {recording, handleClose, images, setImages, showImage} = props

    const [image, setImage] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

     const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

    const renderImages = () => {
      console.log(images)
      return images.map((i)=> {
         return (
         <>
         <img onClick={() => {setShowImageModal ( !showImageModal)}} src={i.pointer} style={{width:"100px"}} /> 
         {showImageModal && <ShowImage showImageModal = {showImageModal} setShowImageModal = {setShowImageModal} deleteImage = {deleteImage} image = {i}/>}
        </>
        )
      })
    }

    const deleteImage = async (id) => {
      let response = await axios.delete(`/api/recordings/${props.recording.id}/photos/${id}`);
      let filteredImages = images.filter((photo) => photo.photo_id !== id);
    setImages(filteredImages);
  };

    return (
        <Modal
        show={1}
      backdrop = "static"
      keyboard = {false}
      style={{width: "800px", margin: "auto"}}
    >
      <Modal.Header >
        <Modal.Title style={{textAlign: "center"}}>Journal Entry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div > 
             <h6>{recording.title}</h6>
            <audio src={recording.pointer} controls style={{height: "35px", margin: "auto"}}/>
            <div style={{margin: "auto"}}>
                  <h6 >{recording.duration}</h6>
                  <h6>{recording.created_at.substring(0, recording.created_at.indexOf("T"))}</h6>
                  <h6>{recording.created_at.substring(recording.created_at.indexOf("T")+1, recording.created_at.indexOf("T")+6)}</h6>
              </div>
            <h6>Notes: </h6>
            <p style={{marginLeft: "20px"}}>{recording.notes}</p>
            {images && renderImages()}
            <br/>
            {showUpload && <RecordingImage toggleUpload = {toggleUpload} setImages = {setImages} images = {images} recording_id = {recording.id}/>}
            {!showUpload && <VocalButton onClick = {toggleUpload}>Add Image</VocalButton>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant = "primary" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
    )
}
export default ShowRecording