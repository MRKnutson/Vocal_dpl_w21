import React, {useEffect, useState} from "react";
import axios from "axios";
import { Table, Button, ButtonToolbar, InputGroup, FormControl } from "react-bootstrap";


const Timeline = () => {

  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    console.log("recordings mounted")
    getRecordings();
  },[]);

  const getRecordings = async () => {
   try { 
     let response = await axios.get("/api/recordings");
      setRecordings(response.data)
      }
    catch (error) {
    alert('error occured getRecordings')
      }
  };

  const renderRecordings = () => {
    return recordings.map((recording) => {
      return (
      <Table striped bordered hover key = {recording.id} style={{margin:"20px"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Pointer</th>
          </tr>
          </thead>
          <tbody>
          {renderRow(recording)}
          </tbody>
      </Table>
      );
    });
    };

  const renderRow = () => {
    return recordings.map((recording) => {
      return(
      <tr key = {recording.id}>
        <td>{recording.title}</td>
        <td>{recording.pointer}</td>
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
    {renderRecordings()}
    </div>
  )
}

export default Timeline;