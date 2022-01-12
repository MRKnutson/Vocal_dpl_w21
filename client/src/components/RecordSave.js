import React, {useState, useEffect} from 'react'

const RecordSave = (props) => {
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")
    const [notes, setNotes] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        let val = e.target.value
        if(e.target.name==="title"){setTitle(val)}
        else if(e.target.name==="mood"){setMood(val)}
        else if(e.target.name==="notes"){setNotes(val)}
    }

    return (
        <div style={{marginTop: "15px"}}>
            <div >
                <h5 >{props.length}</h5>
                <h5>{props.date}</h5>
            </div>
            <h5>Title: <input name="title" onChange={handleChange}></input></h5>
            <h5>Mood: <input name="mood" onChange={handleChange}></input></h5>
            <h5>Notes: <input name="notes" onChange={handleChange}></input></h5>
            <h5>Tags:</h5>
            <button type="submit">Save</button>
        </div>
    )
}
export default RecordSave