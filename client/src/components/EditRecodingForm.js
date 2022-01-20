import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { VocalButton } from './Styles';

const EditRecordingForm = (props)=> {

  const {showEdit, setShowEdit, recording, setRecording} = props
  const [title, setTitle] = useState(props.recording.title)
  const [notes, setNotes] = useState(props.recording.notes)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedRecording = {...recording, title: title, notes: notes};
    try{
      let response = await axios.put(`/api/recordings/${recording.id}`, updatedRecording)
      setRecording(response.data)
      setShowEdit(!showEdit)
    } catch (err) {
      alert('error updating recording')
    }

  };

  return(
    <Form onSubmit = {handleSubmit}>
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
      <VocalButton onClick = {()=>setShowEdit(!showEdit)}>Cancel</VocalButton>
    </Form>
  )
};

export default EditRecordingForm;