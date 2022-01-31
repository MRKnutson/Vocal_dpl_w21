import React from "react"
import { VocalHeader, SecondaryColor, PrimaryColor } from "../components/Styles"
import avatar from "../images/avatar.jpeg"

const HowTo = () => {
    return (
        <div style={{backgroundColor: "white", height:"44rem",marginLeft:"8rem", marginRight:"8rem", marginTop:"5rem", marginBottom:"5rem", borderRadius:"1.5rem", padding:"2rem"}}>
            <h1 style={{color:`${PrimaryColor}`, margin:"2rem"}}>How to use Vocal</h1>
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"8rem", marginRight:"1rem"}} src={avatar} />
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 className="how-to">Record your audio journals</h3>
                <p className="how-to">Save your audio journal entries by clicking the microphone button on the dashboard.</p>
            </div>
            </div>
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"8rem", marginRight:"1rem"}} src={avatar}/> 
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 className="how-to">Track your mood</h3>
                <p className="how-to">Input your mood, and view your mood history at a glance.</p>
            </div>       
            </div>       
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"8rem", marginRight:"1rem"}} src={avatar}/>
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 className="how-to">Review your entries</h3>
                <p className="how-to">Review your journal entries on a daily and session by session basis.</p>
            </div>       
            </div>
        </div>
    )
}

export default HowTo;