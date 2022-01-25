import React from 'react'
import Recorder from '../components/Recorder'
import '../StylesFolder/Styles_Landing.css';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton, ViewButton} from '../components/Styles.js'
import voice from "../images/voice.png";


const Home =  (props) => {
const {recording} = props
console.log(props)
  return (
    <div style={{backgroundColor:`${SecondaryColor}`, height:"40rem",margin:"8rem", borderRadius:"2rem", padding:"2rem"}}>
     <div style={{display:"flex", flexFlow:"column", textAlign:"center", alignItems:"center", marginTop:"5rem"}}>
     <img src={voice} style={{borderRadius:"20rem", height:"20rem"}}/>
     <div style={{}}>
     <Recorder/>
     </div>
     </div>
    </div>
  )
};

export default Home;