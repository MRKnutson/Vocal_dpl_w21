import * as React from "react";
import useRecorder from "./useRecorder";
import {useState, useEffect} from 'react'
import axios from "axios";
import EntryModal from "./EntryModal";
import { useNavigate } from "react-router-dom";
import microphone from "../images/microphone.jpg"
import stop from "../images/stop.jpg"
import {
    ActionColor,
    SecondaryColor,
    VocalButton,
    VocalHeader,
    ViewButton,
  } from "./Styles";
import AudioMeter from './AudioMeter'
import * as Tone from 'tone'

function Recorder() {
    const nav = useNavigate()
    let [audioURL, blobURL, isRecording, startRecording, stopRecording, clearRecording, recorder] = useRecorder();
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")
    const [notes, setNotes] = useState([])
    const [duration, setDuration] = useState("")
    const [secondsElapsed, setSecondsElapsed] = useState("")

    const [tags, setTags] = useState([])

    let timer

  function secondsToHms() {
    var h = Math.floor(secondsElapsed / 3600);
    var m = Math.floor(secondsElapsed % 3600 / 60);
    var s = Math.floor(secondsElapsed % 3600 % 60);
    var n = Math.floor(secondsElapsed % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " Hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " Minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " Second" : " Seconds") : "";
    var nDisplay = n < 1 ? n + " Seconds" : "";
    return hDisplay + mDisplay + sDisplay +nDisplay; 
}

    
    useEffect(()=>{
        getTags()
    }, [])

    useEffect(()=>{
        timer = setTimeout(() => {
            if(isRecording){
                setSecondsElapsed(secondsElapsed+1)
                let secs = ((secondsElapsed+1)%60)
                let mins = Math.floor((secondsElapsed+1)/60)
                setDuration(mins + ":" + (secs<10 ? "0" + secs : secs))
            }
            
          }, 1000);
           return () => clearTimeout(timer);
    }, [secondsElapsed])

    const handleChange = (e) => {
        e.preventDefault()
        let val = e.target.value
        if(e.target.name==="title"){setTitle(val)}
        else if(e.target.name==="notes"){setNotes(val)}
    }

    const handleSubmit = async (e, chosenTags, selectedMood) => {
        console.log(selectedMood + "in recorder")
        e.preventDefault()
    
        
        let data = new FormData()
        if (audioURL){
          data.append('file', audioURL)
          data.append('title', title)
          data.append('notes', notes)
          data.append('mood', selectedMood)
        
          
          try{
              console.log("url: ", audioURL)
              let res = await axios.post('/api/recordings', data)
              processTags(chosenTags, res.data.id)
            } catch(err){
                console.log(err)
            }
        }
            console.log("submitted to controller")
            nav('/recordings')
    }


    const connectTag = async (tag_id, rec_id) => {
        await axios.put(`/api/tags/${tag_id}`, {recording_id: rec_id})
    }
    const addTag = async (rec_id, text) => {
        await axios.post('/api/tags', {text: text, recording_id: rec_id})
    }
    const processTags = async (chosenTags, rec_id) => {
        chosenTags.forEach((ct)=>{
            if(!(tags.map((t)=>t.tag_text).includes(ct.tag_text))){
                try{
                    addTag(rec_id, ct.tag_text)
                } catch (err) {
                    console.log("error creating tag: " + ct.tag_text, err)
                }
            } else {
                let tag_id = tags.find((t)=>t.tag_text===ct.tag_text).tag_id
                connectTag(tag_id, rec_id)
            }
        })
    }

    const getTags = async () => {
        try{
            let res = await axios.get('/api/tags')
            setTags(res.data)
        } catch (err) {
            console.log("error getting tags: " + err)
        }
        
    }
  return (
      <>
    <div style={{display: "flex", margin: "10px"}}>
        {!audioURL ? 
            (isRecording ? 
                <div style={{}}>
                
                    <button style={{background:"none", border:"none", marginBottom:"1rem"}} onClick={()=>{
                    clearTimeout(timer)
                    stopRecording() 
                    }} disabled={!isRecording}>
                    <img className="record-button" src={stop} style={{height:"5rem", borderRadius:"2.5rem"}}/>
                    </button>
                     
                     <br/>
                    <AudioMeter />
                    <br/>
                    <br/>
                    <br/>
                    <div style={{display:"flex", transform: "translate(0px, -50px)"}}>
                    <VocalHeader style={{}}>Recording...</VocalHeader>
                    
                    <br/>
                    
                    <p style={{color:"white", marginLeft:"1rem", fontSize:"2rem"}}>{duration}</p>
                    </div>
                </div>
            :
            <>
            {recorder ?
                <div>
                <button style={{ background: "none", border: "none" }} onClick={() => {
                    setSecondsElapsed(0);
                    setDuration("0:00");
                    startRecording();
                    Tone.start()
                } } disabled={isRecording}>
                      <img className="record-button" src={microphone} style={{ height: "5rem", borderRadius:"2.5rem" }}/>
                  </button>
                {/* <VocalHeader>Click to Record</VocalHeader> */}
                </div>
            :
                <h2>Connect microphone to record</h2>
            } 
                  </>)
        :
        <EntryModal blobURL={blobURL} 
        duration={duration} 
        handleSave={handleSubmit} 
        handleChange={handleChange} 
        show={true} 
        handleClose={clearRecording}
        processTags={processTags}
        secondsElapsed={secondsElapsed}
        mood={mood}
        setMood={setMood}
        
        />
    }  
    </div>

       </>
  );
}
export default Recorder
