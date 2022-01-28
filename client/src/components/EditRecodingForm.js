import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { VocalButton } from './Styles';
import EditTags from './EditTags'
import ShowImage from "./ShowImage.js";
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";
const EditRecordingForm = (props)=> {

  const {showEdit, setShowEdit, recording, setRecording, recordings, setRecordings, getData} = props
  const [title, setTitle] = useState(props.recording.title)
  const [notes, setNotes] = useState(props.recording.notes)
  const [mood, setMood] = useState(props.recording.mood)
  const [tags, setTags] = useState(props.tags)
  const [allTags, setAllTags] = useState([])

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
                  <div>
                    <label>Choose a Mood: </label>
                      <button className="mood-button" style={{width:"3.5rem", border:"none", backgroundColor:"transparent"}} onClick = {(e)=>{selectMood(e,1)}}><img style={{height:"3rem", borderRadius:"1.5rem"}} src={one}/></button>
                      <button className="mood-button" style={{width:"3.5rem", border:"none", backgroundColor:"transparent"}} onClick = {(e)=>{selectMood(e,2)}}><img style={{height:"3rem", borderRadius:"1.5rem"}} src={two}/></button>
                      <button className="mood-button" style={{width:"3.5rem", border:"none", backgroundColor:"transparent"}} onClick = {(e)=>{selectMood(e,3)}}><img style={{height:"3rem", borderRadius:"1.5rem"}} src={three}/></button>
                      <button className="mood-button" style={{width:"3.5rem", border:"none", backgroundColor:"transparent"}} onClick = {(e)=>{selectMood(e,4)}}><img style={{height:"3rem", borderRadius:"1.5rem"}} src={four}/></button>
                      <button className="mood-button" style={{width:"3.5rem", border:"none", backgroundColor:"transparent"}} onClick = {(e)=>{selectMood(e,5)}}><img style={{height:"3rem", borderRadius:"1.5rem"}} src={five}/></button>
                  </div>
                <br/>
      </Form.Group>
      <EditTags selectTags={setTags} chosenTags={tags}/>
      {/* <p>{title}</p> */}
      <VocalButton type = "submit">Submit Changes</VocalButton>
      {/* <VocalButton onClick = {()=>setShowEdit(!showEdit)}>Cancel</VocalButton> */}
    </Form>
  )
};

export default EditRecordingForm;