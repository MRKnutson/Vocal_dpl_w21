import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import useRecorder from "./useRecorder";
import {useState, useEffect} from 'react'
import axios from "axios";
import ChooseTags from './ChooseTags'
import { ActionColor, SecondaryColor, VocalButton, VocalHeader, ViewButton } from './Styles';
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";



const EntryModal = ({handleClose, handleChange, handleSave, show, blobURL, duration, processTags, secondsElapsed}) => {
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")
    const [notes, setNotes] = useState("") 
    const [chosenTags, setChosenTags] = useState([])
    const currentDate = new Date();

    const [date, setDate] = useState(currentDate.toLocaleDateString('default', { year: 'numeric',month: 'long', day:'numeric'}))
    const [time, setTime] = useState(currentDate.toLocaleTimeString())

  
  const handleSubmit = (e) => {
    handleSave(e, chosenTags)
  }

  function secondsToHms() {
    var h = Math.floor(secondsElapsed / 3600);
    var m = Math.floor(secondsElapsed % 3600 / 60);
    var s = Math.floor(secondsElapsed % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " Hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " Minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " Second" : " Seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

  
  return(
    <div>
    <Modal
      show = {show}
      onHide = {handleClose}
      backdrop = "static"
      keyboard = {false}
      // style={{margin: "auto", padding:"1rem"}}
      centered = {true}
      size = "lg"
    >
      {/* <Modal.Header closeButton style ={{backgroundColor: `${SecondaryColor}`, color: "white"}}>
        <Modal.Title style={{textAlign: "center"}}>Journal Entry Details</Modal.Title>
      </Modal.Header> */}
      {/* <div className="modal-content" style={{borderRadius:"2rem", backgroundColor:`${SecondaryColor}`, border:"none"}}> */}
      <Modal.Body style ={{backgroundColor: `${SecondaryColor}`, color: "white", padding:"2rem", borderRadius:"1.5rem"}}>
        <form> 
      <ViewButton style={{}} variant="secondary" onClick = {handleClose}>
        Cancel
      </ViewButton>
          {/* <audio src={blobURL} controls style={{height: "35px", margin: "auto"}}/> */}
          <div>
              <div style={{margin: "auto", textAlign:"center"}}>
                  <VocalHeader>{secondsToHms()}</VocalHeader>
                  <h6 style={{marginBottom:"4rem"}}>{date}</h6>
                  {/* <h6>Time: {time}</h6> */}
              </div>
              <div>
                <label style={{marginRight:"1rem"}}>Title: </label>
                <input style={{borderRadius:".3rem", border:"none", padding:".3rem"}} type="text" onChange={handleChange}/>
                </div>
                {/* <Form.Control name="title" onChange={handleChange}/> */}
                <br/>
                <div>
                <label style={{marginRight:".8rem"}}>Choose a Mood: </label>
                <button style={{border:"none", backgroundColor:`${SecondaryColor}`}} value={1} onClick = {(e)=>setMood(e.target.value)}><img style={{height:"3rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={one}/></button>
                <button style={{border:"none", backgroundColor:`${SecondaryColor}`}} value={2} onClick = {(e)=>setMood(e.target.value)}><img style={{height:"3rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={two}/></button>
                <button style={{border:"none", backgroundColor:`${SecondaryColor}`}} value={3} onClick = {(e)=>setMood(e.target.value)}><img style={{height:"3rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={three}/></button>
                <button style={{border:"none", backgroundColor:`${SecondaryColor}`}} value={4} onClick = {(e)=>setMood(e.target.value)}><img style={{height:"3rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={four}/></button>
                <button style={{border:"none", backgroundColor:`${SecondaryColor}`}} value={5} onClick = {(e)=>setMood(e.target.value)}><img style={{height:"3rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={five}/></button>
                {/* <select defaultValue = {mood} as= "select" onChange ={handleChange} style={{width: "4rem"}}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option> 
                </select>*/}
                </div>
                <br/>
                <label style={{marginBottom:".5rem"}}>Notes:</label>
                <br/>
                <textarea style={{height:"8rem", width:"30rem", borderRadius:".4rem", padding:".6rem"}} onChange = {handleChange}/>
                <ChooseTags selectTags={setChosenTags} />
          </div>
        </form>
        <br/>
        <ViewButton style={{width:"100%"}} variant = "primary" onClick = {handleSubmit}>
          Save
        </ViewButton>
      </Modal.Body>
      {/* </div> */}
    </Modal>
    </div>
  )
};

export default EntryModal;