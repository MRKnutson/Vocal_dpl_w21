import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import { VocalButton } from './Styles';
import EditTags from './EditTags'
const EditRecordingForm = (props)=> {

  const {showEdit, setShowEdit, recording, setRecording, recordings, setRecordings} = props
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
    let updatedRecording = {...recording, title: title, notes: notes};
    clearTags()
    processTags(tags, recording.id)
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
      <EditTags selectTags={setTags} chosenTags={tags}/>
      {/* <p>{title}</p> */}
      <VocalButton type = "submit">Submit Changes</VocalButton>
      {/* <VocalButton onClick = {()=>setShowEdit(!showEdit)}>Cancel</VocalButton> */}
    </Form>
  )
};

export default EditRecordingForm;