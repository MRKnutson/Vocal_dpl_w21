import * as React from "react";
import useRecorder from "./useRecorder";
import {useState, useEffect} from 'react'
import axios from "axios";
import EntryModal from "./EntryModal";

function Recorder() {
    let [audioURL, isRecording, startRecording, stopRecording, clearRecording] = useRecorder();
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")
    const [notes, setNotes] = useState("")
    const [duration, setDuration] = useState("")
    const [secondsElapsed, setSecondsElapsed] = useState("")

    useEffect(()=>{
        const timer = setTimeout(() => {
            if(isRecording){
                setSecondsElapsed(secondsElapsed+1)
                setDuration(Math.floor((secondsElapsed+1)/60) + ":" + ((secondsElapsed+1)%60))
            }
            
          }, 1000);
           return () => clearTimeout(timer);
    }, [secondsElapsed])

    const handleChange = (e) => {
        e.preventDefault()
        let val = e.target.value
        if(e.target.name==="title"){setTitle(val)}
        else if(e.target.name==="mood"){setMood(val)}
        else if(e.target.name==="notes"){setNotes(val)}
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = new FormData()
        if (audioURL){
          data.append('file', audioURL)
        }
        try{
          let res = await axios.post('/api/recordings', data)
          console.log("url: ", audioURL)
        } catch(err){
            console.log(err)
        }
        console.log("submitted")
    }

  return (
    <div style={{display: "flex", margin: "10px"}}>
        {!audioURL ? 
            (isRecording ? 
                <div style={{display: "flex", gap: "10px"}}>
                    <button onClick={()=>{
                    setSecondsElapsed("")
                    stopRecording() 
                }} disabled={!isRecording}>
                        STOP
                    </button>
                    <h5>{duration}</h5>
                </div>
            :
                <button onClick={()=>{
                    setSecondsElapsed(0)
                    setDuration("0:0")
                    startRecording() 
                }} disabled={isRecording}>
                    REC
                </button>)
        :
           <EntryModal audioURL={audioURL} duration={duration} handleSave={handleSubmit} show={true} handleClose={clearRecording}/>
        }
       
        
      
    </div>
  );
}
export default Recorder
