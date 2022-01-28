import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useRecorder from "./useRecorder";
import { useState, useEffect } from "react";
import axios from "axios";
import ChooseTags from "./ChooseTags";
import {
  ActionColor,
  SecondaryColor,
  VocalButton,
  VocalHeader,
  ViewButton,
} from "./Styles";
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";
const EntryModal = ({
  handleClose,
  handleChange,
  handleSave,
  show,
  blobURL,
  duration,
  processTags,
  secondsElapsed,
  mood,
  setMood,
}) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [chosenTags, setChosenTags] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const currentDate = new Date();

  const [date, setDate] = useState(
    currentDate.toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [time, setTime] = useState(currentDate.toLocaleTimeString());

  const handleSubmit = (e) => {
    setDisableButton(true);
    console.log(selectedMood + "in handle submit");
    e.preventDefault();
    handleSave(e, chosenTags, selectedMood);
  };

  function secondsToHms() {
    var h = Math.floor(secondsElapsed / 3600);
    var m = Math.floor((secondsElapsed % 3600) / 60);
    var s = Math.floor((secondsElapsed % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " Hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " Minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " Second" : " Seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  const selectMood = (e, value) => {
    e.preventDefault();
    setSelectedMood(value);
    console.log(value);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        // style={{margin: "auto", padding:"1rem"}}
        centered={true}
        size='lg'
      >
        {/* <Modal.Header closeButton style ={{backgroundColor: `${SecondaryColor}`, color: "white"}}>
        <Modal.Title style={{textAlign: "center"}}>Journal Entry Details</Modal.Title>
      </Modal.Header> */}
        {/* <div className="modal-content" style={{borderRadius:"2rem", backgroundColor:`${SecondaryColor}`, border:"none"}}> */}
        <Modal.Body
          style={{
            backgroundColor: `${SecondaryColor}`,
            color: "white",
            padding: "2rem",
            borderRadius: "1.5rem",
          }}
        >
          <form>
            <ViewButton style={{}} variant='secondary' onClick={handleClose}>
              Cancel
            </ViewButton>
            {/* <audio src={blobURL} controls style={{height: "35px", margin: "auto"}}/> */}
            <div>
              <div style={{ margin: "auto", textAlign: "center" }}>
                <VocalHeader>{secondsToHms()}</VocalHeader>
                <h6 style={{ marginBottom: "4rem" }}>{date}</h6>
                {/* <h6>Time: {time}</h6> */}
              </div>
              <div>
                <label style={{ marginRight: "1rem" }}>Title: </label>
                <input
                  name='title'
                  style={{
                    borderRadius: ".3rem",
                    border: "none",
                    padding: ".3rem",
                  }}
                  type='text'
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <label style={{marginRight:"1rem"}}>Title: </label>
                <input name="title" style={{borderRadius:".3rem", border:"none", padding:".3rem"}} type="text" onChange={handleChange}/>
                </div>
                <br/>
                <div className="mood-div">
                  <label style={{marginRight:".8rem"}}>Choose a Mood: </label>
                    <img className="mood-button" onClick = {(e)=>{selectMood(e,1)}} style={{height:"3rem", borderRadius:"1.5rem", marginRight:"1rem"}} src={one}/>
                    <img className="mood-button" onClick = {(e)=>{selectMood(e,2)}} style={{height:"3rem", borderRadius:"1.5rem", marginRight:"1rem"}} src={two}/>
                    <img className="mood-button" onClick = {(e)=>{selectMood(e,3)}} style={{height:"3rem", borderRadius:"1.5rem", marginRight:"1rem"}} src={three}/>
                    <img className="mood-button" onClick = {(e)=>{selectMood(e,4)}} style={{height:"3rem", borderRadius:"1.5rem", marginRight:"1rem"}} src={four}/>
                    <img className="mood-button" onClick = {(e)=>{selectMood(e,5)}} style={{height:"3rem", borderRadius:"1.5rem", marginRight:"1rem"}} src={five}/>
                </div>
                <br/>
                <label style={{marginBottom:".5rem"}}>Notes:</label>
                <br/>
                <textarea name="notes" style={{height:"8rem", width:"28rem", borderRadius:".4rem", padding:".6rem"}} onChange = {handleChange}/>
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
  );
};

export default EntryModal;
