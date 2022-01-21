import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { VocalButton } from './Styles';

const EditRecordingForm = (props)=> {

  const {showEdit, setShowEdit, recording, setRecording, recordings, setRecordings} = props
  const [title, setTitle] = useState(props.recording.title)
  const [notes, setNotes] = useState(props.recording.notes)
  const [mood, setMood] = useState(props.recording.mood)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedRecording = {...recording, title: title, notes: notes};
    try{
      let response = await axios.put(`/api/recordings/${recording.id}`, updatedRecording)
      setRecording(response.data)
      updateRecordings(response.data)
      setShowEdit(!showEdit)
    } catch (err) {
      alert('error updating recording')
    }
  };

  const updateRecordings = (changedRecording) => {
    let updatedRecordings = recordings.map((r) => (r.id === changedRecording.id ? changedRecording : r));
  setRecordings(updatedRecordings)
  };

  return(
    <Form onSubmit = {handleSubmit}>
      <Form.Group className = "mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control defaultValue = {title} onChange = {(e)=>setTitle(e.target.value)}/>
      </Form.Group>
      <Form.Group className = "mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control as="textarea" defaultValue = {notes} onChange = {(e)=>setNotes(e.target.value)}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Mood</Form.Label>
        <Form.Select name = "mood" defaultValue = {mood} as= "select" onChange ={(e)=>setMood(e.target.value)} style={{width: "4rem"}}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </Form.Select>
      </Form.Group>
      {/* <p>{title}</p> */}
      <VocalButton type = "submit">Submit Changes</VocalButton>
      {/* <VocalButton onClick = {()=>setShowEdit(!showEdit)}>Cancel</VocalButton> */}
    </Form>
  )
};

export default EditRecordingForm;