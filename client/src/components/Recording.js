const Recording = (props) => {
    const {recording, showRecording, tags} = props
    return (
        <div onClick={showRecording} style={{borderWidth: "1px", borderColor: "black", borderStyle: "solid"}}>
            <h4>{recording.title}</h4>
            <p>Duration: {recording.duration.toString().substring(0, recording.duration.toString().indexOf(".")+3)}</p> {/*limiting to 2 decimal digits */}
            <p>Date: {recording.created_at.substring(0, recording.created_at.indexOf("T"))}</p>
            <p>Tags: {tags.map((t)=> t.tag_text)}</p>
            <audio src={recording.pointer} controls style={{height: "35px", margin: "auto"}}/>
        </div> 
        )
}
export default Recording