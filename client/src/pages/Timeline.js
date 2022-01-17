import React, {useEffect, useState} from "react";
import axios from "axios";
import { Table, Button, ButtonToolbar, InputGroup, FormControl, Dropdown, DropdownButton } from "react-bootstrap";


const Timeline = () => {

  const [recordings, setRecordings] = useState([]);
  const [tagChoice, setTagChoice] = useState(null)

  useEffect(() => {
    getRecordings();
  },[]);

  const getRecordings = async () => {
   try { 
     let response = await axios.get("/api/tags");
      setRecordings(response.data)
      }
    catch (error) {
    alert('error occured getRecordings')
      }
  };
// This renders all the current_user's recordings
  const renderRecordings = () => {
    return (
    <Table striped bordered hover style={{margin:"20px"}}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Pointer</th>
        </tr>
        </thead>
        <tbody>
        {renderRow()}
        </tbody>
    </Table>
    )
  };
// This is triggered when the DD is selected and fiters the records to the chosen tag
  const renderSelectedRecordings = () => {
    return (
      <Table striped bordered hover style={{margin:"20px"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Pointer</th>
          </tr>
          </thead>
          <tbody>
          {renderRow()}
          </tbody>
      </Table>
      )
  }
// if statement here checks wheather a tag has been selected or not
  const renderRow = () => {
    if (!tagChoice){
    return recordings.map((recording) => {
      return(
      <tr key = {recording.id}>
        <td>{recording.title}</td>
        <td>{recording.pointer}</td>
      </tr> )
    })} else {
      let filteredRecs = recordings.filter((r)=> r.tag_id == tagChoice)
      return filteredRecs.map((recording) => {
        return (
        <tr key = {recording.id}>
          <td>{recording.title}</td>
          <td>{recording.pointer}</td>
        </tr> 
        )});
    }
  }
// this renders the possible tags the person has
  const renderSearchTags = () => {
    console.log(tagChoice)
    let recs = recordings
    let count = 1
    return recs.map((r)=>{
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
        <Dropdown.Item eventKey="4">View All Recordings</Dropdown.Item>
      </DropdownButton> 
      
      
      {/* <Button>Search</Button>{' '} */}
      {/* <FormControl
        type="text"
        placeholder="..."
      /> */}
    </InputGroup>
    {tagChoice ? renderSelectedRecordings() : renderRecordings()}
    </div>
  )
}

export default Timeline;