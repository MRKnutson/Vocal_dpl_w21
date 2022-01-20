import * as React from "react";
import useRecorder from "./useRecorder";
import {useState, useEffect} from 'react'
import axios from "axios";
import EntryModal from "./EntryModal";
import { useNavigate } from "react-router-dom";

function Recorder() {
    const nav = useNavigate()
    let [audioURL, blobURL, isRecording, startRecording, stopRecording, clearRecording] = useRecorder();
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")
    const [notes, setNotes] = useState([])
    const [duration, setDuration] = useState("")
    const [secondsElapsed, setSecondsElapsed] = useState("")


    let timer
    

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
        else if(e.target.name==="mood"){setMood(val)}
        else if(e.target.name==="notes"){setNotes(val)}
    }

    const handleSubmit = async (e, chosenTags) => {
        e.preventDefault()

        
        
        let data = new FormData()
        if (audioURL){
          data.append('file', audioURL)
          data.append('title', title)
          data.append('notes', notes)
          data.append('mood', parseInt(mood))
        
        }
        try{
            console.log("url: ", audioURL)
          let res = await axios.post('/api/recordings', data)
          processTags(chosenTags, res.data.id)
        } catch(err){
            console.log(err)
        }
        console.log("submitted to controller")
        nav('/recordings')
    }


    const processTags = async (tags, rec_id) => {
        tags.forEach((t)=>{
            if(typeof t == "string"){
                try{
                    axios.post('/api/tags', {text: t, recording_id: rec_id})
                } catch (err) {
                    console.log("error creating tag: " + t, err)
                }
            }
        })
    }
  return (
    <div style={{display: "flex", margin: "10px"}}>
        {!audioURL ? 
            (isRecording ? 
                <div style={{display: "flex", gap: "10px"}}>
                    <button onClick={()=>{
                    clearTimeout(timer)
                    stopRecording() 
                }} disabled={!isRecording}>
                        STOP
                    </button>
                    <h5>{duration}</h5>
                </div>
            :
                <button onClick={()=>{
                    setSecondsElapsed(0)
                    setDuration("0:00")
                    startRecording() 
                }} disabled={isRecording}>
                    REC
                </button>)
        :
           <EntryModal blobURL={blobURL} 
                duration={duration} 
                handleSave={handleSubmit} 
                handleChange={handleChange} 
                show={true} 
                handleClose={clearRecording}
                processTags={processTags}
            />
        }
       
        
      
    </div>
  );
}
export default Recorder
