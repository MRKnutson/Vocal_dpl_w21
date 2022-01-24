import React from 'react'
import Recorder from '../components/Recorder'
import '../StylesFolder/Styles_Landing.css';
import { Container } from 'react-bootstrap';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton, ViewButton} from '../components/Styles.js'
 

const Home =  () => {
  // const {recording} = props
  return (
    <div style={{backgroundColor:`${SecondaryColor}`, height:"50rem",margin:"8rem", borderRadius:"2rem", padding:"2rem"}}>
     <VocalHeader style={{position:"absolute",top:"50rem",right:"32rem"}}>0:00 seconds</VocalHeader>
     <div style={{position:"absolute", top:"45rem",right:"38rem"}}>
     {<Recorder/>}
     </div>
    </div>
  )
};

export default Home;