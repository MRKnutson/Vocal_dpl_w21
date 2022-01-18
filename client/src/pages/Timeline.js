import React, {useEffect, useState} from "react";
import axios from "axios";
import { Table, Button, ButtonToolbar, InputGroup, FormControl } from "react-bootstrap";
import ShowRecording from '../components/ShowRecording'

const Timeline = () => {

  const [recordings, setRecordings] = useState([]);
  const [tags, setTags] = useState([]);
  const [showRecordingID, setShowRecordingID] = useState(null)

  useEffect(() => {
    console.log("recordings mounted")
    getRecordings();
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
    alert('error occured getRecordings')
      }
  };
  
  const getTags = async () => {
   try { 
     let response = await axios.get("/api/tags");
      setTags(response.data)
      }
    catch (error) {
    alert('error occured getTags')
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
    );
  };

  const renderRow = () => {
    return recordings.map((recording) => {
      return(
      <tr key = {recording.id} onClick={()=>{setShowRecordingID(recording.id)}}>
        <td><a >{recording.title}</a></td>
        <td>{recording.length.substring(0, recording.length.indexOf(".")+3)}</td> {/*limiting to 2 decimal digits*/}
        <td><audio src={recording.pointer} controls style={{height: "35px", margin: "auto"}}/></td>
        <td>{recording.created_at.substring(0, recording.created_at.indexOf("T"))}</td>
      </tr> )
    })
  }

  return (
    <div>
    <h1 style={{margin:"20px", textAlign:"center"}}>Timeline</h1>
    <InputGroup style={{width:"200px", float:"right", marginBottom:"10px"}}>
      <Button>Search</Button>{' '}
      <FormControl
        type="text"
        placeholder="..."
      />
    </InputGroup>
    {showRecordingID && <ShowRecording recording={recordings.find((r)=>r.id===showRecordingID)} handleClose={()=>{setShowRecordingID(null)}}/>}
    {renderRecordings()}
    </div>
  )
}

export default Timeline;