import React from "react"
import { Link } from "react-router-dom"
import { ActionColor, PrimaryColor, VocalButton } from "../components/Styles"
import record from "../images/record.png"
import daily from "../images/daily.png"
import mood from "../images/mood.png"

const HowTo = () => {
    return (
        <div style={{backgroundColor: "white", height:"auto",marginLeft:"8rem", marginRight:"8rem", marginTop:"5rem", marginBottom:"5rem", borderRadius:"1.5rem", padding:"2rem"}}>
            <h1 style={{color:`${PrimaryColor}`, margin:"2rem", fontWeight:"700", fontSize:"3rem"}}>How to use Vocal</h1>
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"10rem", marginRight:"2rem", marginBottom:"2rem", borderRadius:".4rem"}} src={record} />
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 style={{fontWeight:"700", fontSize:"2rem"}} className="how-to">Record your audio journals</h3>
                <p style={{fontSize:"1.4rem"}} className="how-to">Record & save your audio on the Record page.</p>
            </div>
            </div>
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"10rem", marginRight:"2rem", marginBottom:"2rem", borderRadius:".4rem"}} src={mood}/> 
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 style={{fontWeight:"700", fontSize:"2rem"}} className="how-to">Track your mood & add tags to recordings</h3>
                <p style={{fontSize:"1.4rem"}} className="how-to">Input your mood, add tags, and view your mood history at a glance.</p>
            </div>       
            </div>       
            <hr className="solid"/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <img style={{height:"10rem", marginRight:"2rem", marginBottom:"2rem", borderRadius:".4rem"}} src={daily}/>
                <div style={{display:"flex", flexDirection:"column"}}>
                <h3 style={{fontWeight:"700", fontSize:"2rem"}} className="how-to">Review your entries</h3>
                <p style={{fontSize:"1.4rem"}} className="how-to">Review your journal entries on a daily and session by session basis.</p>
            </div>       
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
            <Link className="continue" style={{textDecoration:"none"}} to='/'>Continue</Link>
            </div>
        </div>
    )
}

export default HowTo;