import React from "react"
import { Link } from "react-router-dom"
import { ActionColor, PrimaryColor, VocalButton } from "../components/Styles"
import record from "../images/record.png"
import daily from "../images/daily.png"
import mood from "../images/mood.png"

const HowTo = () => {
    return (
        <div style={{backgroundColor: "white", height:"auto",marginLeft:"8rem", marginRight:"8rem", marginTop:"5rem", marginBottom:"5rem", borderRadius:"1.5rem", padding:"2rem"}}>
            <h1 style={{color:`${PrimaryColor}`, margin:"2rem"}}>How to use Vocal</h1>
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"8rem", marginRight:"1rem", marginBottom:"2rem"}} src={record} />
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 className="how-to">Record your audio journals with the recorder!</h3>
                <p className="how-to">Save your audio journal entries by clicking the microphone button on the dashboard.</p>
            </div>
            </div>
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"8rem", marginRight:"1rem", marginBottom:"2rem"}} src={mood}/> 
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 className="how-to">Track your mood on the Mood page</h3>
                <p className="how-to">Input your mood, and view your mood history at a glance.</p>
            </div>       
            </div>       
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"8rem", marginRight:"1rem", marginBottom:"2rem"}} src={daily}/>
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 className="how-to">Review your entries in the Timeline</h3>
                <p className="how-to">Review your journal entries on a daily and session by session basis.</p>
            </div>       
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
            <VocalButton><Link style={{color:"white",textDecoration:"none"}} to='/'>Go to Recorder</Link></VocalButton>
            </div>
        </div>
    )
}

export default HowTo;