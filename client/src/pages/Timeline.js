import React, {useEffect, useState} from "react";
import axios from "axios";
import ShowRecording from '../components/ShowRecording'
import { Table, Button, ButtonToolbar, InputGroup, FormControl, Dropdown, DropdownButton } from "react-bootstrap";


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
    return (
    <Table class="table table-hover" striped bordered hover style={{margin:"20px"}}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Length</th>
          <th>Audio</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
          {renderRow()}
        </tbody>
    </Table>
    )
  };


// This is triggered when the DD is selected and fiters the records to the chosen tag
  // const renderSelectedRecordings = () => {
  //   return (
  //     <Table striped bordered hover style={{margin:"20px"}}>
  //       <thead>
  //         <tr>
  //           <th>Title</th>
  //           <th>Pointer</th>
  //         </tr>
  //         </thead>
  //         <tbody>
  //         {renderRow()}
  //         </tbody>
  //     </Table>
  //     )
  // }


// if statement here checks wheather a tag has been selected or not
  const renderRow = () => {
    if (!tagChoice){
    return recordings.map((recording) => {
      return(
      <tr key = {recording.id} onClick={()=>{setShowRecordingID(recording.id)}}>
        <td><a >{recording.title}</a></td>
        {/* <td>{recording.length.substring(0, recording.length.indexOf(".")+3)}</td> limiting to 2 decimal digits */}
        <td><audio src={recording.pointer} controls style={{height: "35px", margin: "auto"}}/></td>
        <td>{recording.created_at.substring(0, recording.created_at.indexOf("T"))}</td>
      </tr> )
    })} else {
      console.log("else hit")
      let filteredRecs = recordings.filter((r)=> r.tag_id == tagChoice)
      return filteredRecs.map((recording) => {
        return (
        <tr key = {recording.id}>
          <td>{recording.title}</td>
          <td>{recording.pointer} --- Tag_ID: {recording.tag_id}</td>
        </tr> 
        )});
    }
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
    {renderRecordings()}
    </div>
  )
}

export default Timeline;