import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { VocalButton } from './Styles';

const EditRecordingForm = (props)=> {

  const [recording, setRecording] = useState(props.recording)
  const [title, setTitle] = useState(props.recording.title)
  const [notes, setNotes] = useState(props.recording.notes)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedRecording = {...recording, title: title, notes: notes};
    try{
      let response = await axios.put(`/api/recordings/${recording.id}`, updatedRecording)
      setRecording(response.data)
    } catch (err) {
      alert('error updating recording')
    }

  };

  return(
    <Form onSubmit = {handleSubmit}>
      <h1>Form Here</h1>
      <h3>{recording.title}</h3>
      <p>{recording.duration}</p>
      <Form.Group className = "mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control defaultValue = {title} onChange = {(e)=>setTitle(e.target.value)}/>
      </Form.Group>
      <Form.Group className = "mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control defaultValue = {notes} onChange = {(e)=>setNotes(e.target.value)}/>
      </Form.Group>
      {/* <p>{title}</p> */}
      <VocalButton type = "submit">Submit Changes</VocalButton>
    </Form>
  )
};

export default EditRecordingForm;