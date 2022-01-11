import React, {useEffect, useState} from "react";
import axios from "axios";
import RenderJson from "../components/RenderJson";


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
      <>
        <table>
          <tr>
            <tr>
              <td>Title</td>
              <td>Pointer</td>
            </tr>
          </tr>
    <tr>
      {renderRow(recording)}
    </tr>
  </table>
  <divider/>
      </>
      );
    });
    };

  const renderRow = (recording) => {
    return recordings.map((recording) => {
      return(
      <tr>
        {/* <td>{recording.title}</td>
        <td>{recording.pointer}</td> */}
        <td>Title</td>
        <td>Pointer</td>
      </tr> )
    })
  }

  return (
    <div>
      <RenderJson json = {recordings}/>
    <h1>Timeline</h1>
    {renderRecordings()}
    </div>
  )
}

export default Timeline;