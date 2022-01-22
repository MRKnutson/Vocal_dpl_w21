import {useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
import RecordingImage from '../components/RecordingImage';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton, ViewButton} from '../components/Styles.js'
import axios from "axios";
import ShowImage from "../components/ShowImage";
import EditRecordingForm from './EditRecodingForm';

const ShowRecording = (props) => {
    const {handleClose, images, setImages, showImage, recordings, setRecordings} = props

    const [recording, setRecording] = useState(props.recording)
    const [image, setImage] = useState(null);
    const [showUpload, setShowUpload] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false)

     const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const toggleEdit = () =>{
    setShowEdit(!showEdit)
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

  const handleDeleteRecording = async (id) => {
    try{
      let response = await axios.delete(`/api/recordings/${id}`)
      let filteredRecordings = recordings.filter((r) => r.id !== id)
      setRecordings(filteredRecordings)
      handleClose()
    } catch (err) {
      alert('error deleting recording')
    }
  };

    return (
        <Modal
        show={1}
      backdrop = "static"
      keyboard = {false}
      // size= "lg"
      centered={true}
      style={{margin: "auto", borderRadius:"1rem"}}
    >
      <Modal.Header style ={{backgroundColor: `${SecondaryColor}`}}>
        <Modal.Title style={{textAlign: "center", color: `white`}}>Journal Entry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style ={{backgroundColor: `${SecondaryColor}`, color: "white"}}>
        <div > 
             {!showEdit && <h6>{recording.title}</h6>}
            <audio src={recording.pointer} controls style={{height: "35px", margin: "auto"}}/>
            {!showEdit && <div style={{margin: "auto"}}>
                  <h6 >{recording.duration}</h6>
                  <h6>{recording.created_at.substring(0, recording.created_at.indexOf("T"))}</h6>
                  <h6>{recording.created_at.substring(recording.created_at.indexOf("T")+1, recording.created_at.indexOf("T")+6)}</h6>
              </div>}
            {!showEdit && <h6>Notes: </h6>}
            {!showEdit && <p style={{marginLeft: "20px"}}>{recording.notes}</p>}
            {!showEdit && <p>Tags: {props.tags.map((t)=> t.tag_text).join(', ')}</p>}
            {images && renderImages()}
            <br/>
            {showUpload && <RecordingImage toggleUpload = {toggleUpload} setImages = {setImages} images = {images} recording_id = {recording.id}/>}
            {!showUpload && <ViewButton style={{marginRight:"1rem"}} onClick = {toggleUpload}>Add Image</ViewButton>}
            {showEdit && <EditRecordingForm toggleEdit = {toggleEdit} recording = {recording} setRecording = {setRecording} showEdit = {showEdit} setShowEdit= {setShowEdit} recordings = {recordings} setRecordings = {setRecordings}/>}
            {!showEdit && <ViewButton style={{marginRight:"1rem"}} onClick = {toggleEdit}>Edit Recording</ViewButton>}
            {!showEdit && <ViewButton onClick = {()=>handleDeleteRecording(recording.id)}>Delete Recording</ViewButton>}
        </div>
      </Modal.Body>
      <Modal.Footer style ={{backgroundColor: `${SecondaryColor}`}}>
        {!showEdit && <ViewButton onClick={handleClose}>
          Close
        </ViewButton>}
        {showEdit && <ViewButton onClick={toggleEdit}>Cancel</ViewButton>}
      </Modal.Footer>
    </Modal>
    )
}
export default ShowRecording