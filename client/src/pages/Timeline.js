import React, {useEffect, useState} from "react";
import axios from "axios";
import ShowRecording from '../components/ShowRecording'
import { Table, Button, ButtonToolbar, InputGroup, FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import Recording from '../components/Recording'


const Timeline = () => {
  const [recordings, setRecordings] = useState([]);
  const [tags, setTags] = useState([]);
  const [showRecordingID, setShowRecordingID] = useState(null)
  const [tagChoice, setTagChoice] = useState(null)

  useEffect(() => {
    getRecordings();
    getTags();
  },[]);
  
  useEffect(() => {
    console.log("showRecordingID: " + showRecordingID)
  },[showRecordingID]);

  const getRecordings = async () => {
   try { 
     let response = await axios.get("/api/recordings");
      setRecordings(response.data)
      }
    catch (error) {
    alert('error occured in getRecordings')
      }
  };
  
  const getTags = async () => {
   try { 
     let response = await axios.get("/api/tags");
      setTags(response.data)
      }
    catch (error) {
    alert('error occured in getTags')
      }
  };

  const renderRecordings = () => {
    let recs = recordings
    if (tagChoice){
      recs = recordings.filter((r)=> r.tag_id == tagChoice)
    }
    return recs.map((recording) => {
      return(
        <Recording recording={recording} showRecording={()=>{setShowRecordingID(recording.id)}} tags={tags.filter((t)=>t.recording_id === recording.id)}/>
      )
    })
  }
// this renders the possible tags the person has
  const renderSearchTags = () => {
    let count = 0
    return recordings.map((r)=>{
      // Change this to display the name of the tag once it has real data
      count++
      return <Dropdown.Item key={r.tag_id} eventKey={`${r.tag_id}`}>{r.tag_id}</Dropdown.Item>
    })
  }

  const handleSelection = (e) => {
   setTagChoice(e);
  }

  return (
    <div>
    <h1 style={{margin:"20px", textAlign:"center"}}>Timeline</h1>
    <InputGroup style={{width:"200px", float:"left", marginBottom:"10px"}}>
      <DropdownButton  onSelect={(choice)=>handleSelection(choice)} align="end" title="Search Tags" id="dropdown-menu-align-end">
        {renderSearchTags()}
      <Dropdown.Divider />
        <Dropdown.Item eventKey="All">View All Recordings</Dropdown.Item>
      </DropdownButton> 
      
    </InputGroup>
    {showRecordingID && <ShowRecording recording={recordings.find((r)=>r.id===showRecordingID)} handleClose={()=>{setShowRecordingID(null)}}/>}
    <br /> <br />
    {renderRecordings()}
    </div>
  )
}

export default Timeline;