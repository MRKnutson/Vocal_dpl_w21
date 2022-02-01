import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { VocalButton } from './Styles';
import EditTags from './EditTags'
import ShowImage from "./ShowImage.js";
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";


const EditRecordingModal = (props)=> {

  const {showEdit, setShowEdit, recording, setRecording, recordings, setRecordings, getData} = props
  const [title, setTitle] = useState(props.recording.title)
  const [notes, setNotes] = useState(props.recording.notes)
  const [mood, setMood] = useState(props.recording.mood)
  const [tags, setTags] = useState(props.tags)
  const [allTags, setAllTags] = useState([])
  const [recording, setRecording] = useState(props.recording);
  const [image, setImage] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  useEffect(()=>{
    getAllTags()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedRecording = {...recording, title: title, notes: notes, mood: mood};
    
    try{
      clearTags()
      processTags(tags, recording.id)
      let response = await axios.put(`/api/recordings/${recording.id}`, updatedRecording)
      setRecording(response.data)
      updateRecordings(response.data)
      setShowEdit(!showEdit)
      
    } catch (err) {
      alert('error updating recording')
    }
    getData()
  };

  const updateRecordings = (changedRecording) => {
    let updatedRecordings = recordings.map((r) => (r.id === changedRecording.id ? changedRecording : r));
  setRecordings(updatedRecordings)
  };

  const clearTags = async () => {
    await axios.get(`/api/recordings/${recording.id}/clear_tags`)
  }

  const connectTag = async (tag_id, rec_id) => {
        await axios.put(`/api/tags/${tag_id}`, {recording_id: rec_id})
    }
    const addTag = async (rec_id, text) => {
        await axios.post('/api/tags', {text: text, recording_id: rec_id})
    }
    const processTags = async (chosenTags, rec_id) => {
        chosenTags.forEach((ct)=>{
            if(!(allTags.map((t)=>t.tag_text).includes(ct.tag_text))){
                try{
                    addTag(rec_id, ct.tag_text)
                } catch (err) {
                    console.log("error creating tag: " + ct.tag_text, err)
                }
            } else {
                let tag_id = allTags.find((t)=>t.tag_text===ct.tag_text).tag_id
                connectTag(tag_id, rec_id)
            }
        })
    }

    const getAllTags = async () => {
        try{
            let res = await axios.get('/api/tags')
            setAllTags(res.data)
        } catch (err) {
            console.log("error getting tags: " + err)
        }
        
    }

    const selectMood = (e, value) => {
      e.preventDefault()
      setMood(value)
      console.log(value)
    }

  return(
      <Modal show={1}
      backdrop='static'
      keyboard={false}
      size='lg'
      centered={true}
      onHide={handleClose}>
        <Modal.Body style={{
          backgroundColor: `${SecondaryColor}`,
          color: "white",
          padding: "2rem",
          borderRadius: "1.5rem"}}>
            <Form onSubmit = {handleSubmit}>
                <Form.Group className = "mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control defaultValue = {title} maxLength={55} onChange = {(e)=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className = "mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" maxLength={255} defaultValue = {notes} onChange = {(e)=>setNotes(e.target.value)}/>
                </Form.Group>
                <Form.Group>
              <br/>
              <div
                className='mood-div'
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                  <label style={{ marginRight: ".8rem" }}>Choose a Mood: </label>
                <input
                  type='image'
                  className='mood-button'
                  onClick={(e) => {
                    selectMood(e, 1);
                  }}
                  style={{
                    height: "2.8rem",
                    borderRadius: "1.5rem",
                    marginRight: "1rem",
                  }}
                  src={one}
                />
                <input
                  type='image'
                  className='mood-button'
                  onClick={(e) => {
                    selectMood(e, 2);
                  }}
                  style={{
                    height: "2.8rem",
                    borderRadius: "1.5rem",
                    marginRight: "1rem",
                  }}
                  src={two}
                />
                <input
                  type='image'
                  className='mood-button'
                  onClick={(e) => {
                    selectMood(e, 3);
                  }}
                  style={{
                    height: "2.8rem",
                    borderRadius: "1.5rem",
                    marginRight: "1rem",
                  }}
                  src={three}
                />
                <input
                  type='image'
                  className='mood-button'
                  onClick={(e) => {
                    selectMood(e, 4);
                  }}
                  style={{
                    height: "2.8rem",
                    borderRadius: "1.5rem",
                    marginRight: "1rem",
                  }}
                  src={four}
                />
                <input
                  type='image'
                  className='mood-button'
                  onClick={(e) => {
                    selectMood(e, 5);
                  }}
                  style={{
                    height: "2.8rem",
                    borderRadius: "1.5rem",
                    marginRight: "1rem",
                  }}
                  src={five}
                />
                  </div>
                <br/>
      </Form.Group>
      <EditTags selectTags={setTags} chosenTags={tags}/>
      <ViewButton style={{ marginRight: "1rem" }} onClick={toggleUpload}>
                Add Image
              </ViewButton>
      <VocalButton type = "submit">Submit Changes</VocalButton>
      <ViewButton onClick={handleClose}>Cancel</ViewButton>
    </Form>
    </Modal.Body>
    </Modal>
  )
};

export default EditRecordingModal;