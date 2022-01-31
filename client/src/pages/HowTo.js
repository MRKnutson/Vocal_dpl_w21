import React from "react"
import { VocalHeader, SecondaryColor, PrimaryColor } from "../components/Styles"
import avatar from "../images/avatar.jpeg"

const HowTo = () => {
    return (
        <div style={{backgroundColor: "white", height:"45rem",margin:"8rem", borderRadius:"1.5rem", padding:"2rem"}}>
            <h1 style={{color:`${PrimaryColor}`}}>How To</h1>
            <hr className="solid"/>
            <div style={{display:"flex"}}>
                <img style={{height:"8rem"}} src={avatar} />
                <h3 className="how-to">Record your audio journals on the dashboard</h3>
                <h4 className="how-to">Save your audio journal entries by clicking the microphone button on the dashboard.</h4>
            </div>
            <hr className="solid"/>
            <div style={{display:"flex"}}>
                <img style={{height:"8rem"}} src={avatar}/> 
                <h3 className="how-to">Track your mood, mood review quick glance</h3>
                <h4 className="how-to">Input your mood, and view your mood history at a glance.</h4>
            </div>       
            <hr className="solid"/>
            <div style={{display:"flex"}}>
                <img style={{height:"8rem"}} src={avatar}/>
                <h3 className="how-to">Review your journal entries. Daily log calendar</h3>
                <h4 className="how-to">Review your journal entries on a daily and session by session basis.</h4>
            </div>
        </div>
    )
}

export default HowTo;