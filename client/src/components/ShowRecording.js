import {useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
const ShowRecording = (props) => {
    const {recording, handleClose} = props

    return (
        <Modal
        show={1}
      backdrop = "static"
      keyboard = {false}
      style={{width: "400px", margin: "auto"}}
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
            <p>Tags: {props.tags.map((t)=> t.tag_text)}</p>
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