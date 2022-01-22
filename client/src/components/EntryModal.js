import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import useRecorder from "./useRecorder";
import {useState, useEffect} from 'react'
import axios from "axios";
import ChooseTags from './ChooseTags'
import { SecondaryColor, VocalButton } from './Styles';
const EntryModal = ({handleClose, handleChange, handleSave, show, blobURL, duration, processTags}) => {

    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")
    const [notes, setNotes] = useState("") 
    const [chosenTags, setChosenTags] = useState([])
    const currentDate = new Date();

    const [date, setDate] = useState(currentDate.toLocaleDateString())
    const [time, setTime] = useState(currentDate.toLocaleTimeString())


  
  const handleSubmit = (e) => {
    handleSave(e, chosenTags)
  }
  
  
  return(
    <Modal
      show = {show}
      onHide = {handleClose}
      backdrop = "static"
      keyboard = {false}
      style={{margin: "auto"}}
      centered = {true}
    >
      <Modal.Header closeButton style ={{backgroundColor: `${SecondaryColor}`, color: "white"}}>
        <Modal.Title style={{textAlign: "center"}}>Journal Entry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style ={{backgroundColor: `${SecondaryColor}`, color: "white"}}>
        <Form > 
          <audio src={blobURL} controls style={{height: "35px", margin: "auto"}}/>
          <div style={{margin: "auto", marginTop: "15px"}}>
              <div style={{margin: "auto"}}>
                  <h6>Duration: {duration} minutes</h6>
                  <h6>Date: {date}</h6>
                  <h6>Time: {time}</h6>
              </div>
              <Form.Group>
                <Form.Label>Title:</Form.Label>
                <Form.Control name="title" onChange={handleChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Mood:</Form.Label>
                <Form.Select name = "mood" defaultValue = {mood} as= "select" onChange ={handleChange} style={{width: "4rem"}}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className = "mb-3">
                <Form.Label>Notes:</Form.Label>
                <Form.Control as="textarea" name="notes" onChange = {handleChange}/>
              </Form.Group>
              <ChooseTags selectTags={setChosenTags} />
              
          </div>
        </Form>
  
      </Modal.Body>
      <Modal.Footer style ={{backgroundColor: `${SecondaryColor}`}}>
        <VocalButton variant="secondary" onClick = {handleClose}>
          Cancel
        </VocalButton>
        <VocalButton variant = "primary" onClick = {handleSubmit}>
          Save
        </VocalButton>
      </Modal.Footer>
    </Modal>
  )
};

export default EntryModal;