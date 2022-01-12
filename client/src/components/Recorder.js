import * as React from "react";
import useRecorder from "./useRecorder";
import {useState, useEffect} from 'react'

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

    const handleSubmit = (e) => {
        //post recording to database
        console.log("submitted")
    }
  console.log("url: ", audioURL)
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
            <div> 
                <audio src={audioURL} controls style={{height: "35px", marginLeft: "-15px"}}/>
                <div style={{marginTop: "15px"}}>
                    <div style={{margin: "auto"}}>
                        <h5 >{duration}</h5>
                        <h5>today's date</h5>
                    </div>
                    <h5>Title: <input name="title" onChange={handleChange}></input></h5>
                    <h5>Mood: <input name="mood" onChange={handleChange}></input></h5>
                    <h5>Notes: <input name="notes" onChange={handleChange}></input></h5>
                    <h5>Tags: <select name="notes" onChange={handleChange}></select></h5>
                    <div style={{display: "flex", gap: "30px", justifyContent: "center"}}>
                        <button onClick={handleSubmit}>SAVE</button>
                        <button onClick={clearRecording} style={{height: "30px"}}>
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        }
       
        
      
    </div>
  );
}
export default Recorder
