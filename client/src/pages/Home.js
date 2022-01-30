import React from 'react'
import Recorder from '../components/Recorder'
import '../StylesFolder/Styles_Landing.css';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton, ViewButton} from '../components/Styles.js'
import soundwaves from "../images/soundwaves.png";


const Home =  (props) => {
const {recording} = props
console.log(props)
  return (
    <div style={{backgroundColor:`${SecondaryColor}`, height:"45rem",margin:"8rem", borderRadius:"1.5rem", padding:"2rem"}}>
     <div style={{display:"flex", flexFlow:"column", textAlign:"center", alignItems:"center", marginTop:"5rem"}}>
     <img src={soundwaves} className="record" style={{height:"21rem", borderRadius:"15rem", marginBottom:"2rem"}}/>
     <div style={{}}>
     <Recorder/>
     </div>
     </div>
    </div>
  )
};

export default Home;