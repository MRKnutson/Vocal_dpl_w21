import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'

const Recording = (props) => {
    const {recording, showRecording, tags, images} = props

    const renderImages = () => {
        if (images && images.length > 0) {
            return images.map((image) => {
               return <img src={image.pointer} alt="image" style={{width:"100px"}}/>
            })
        }
    }
    
    return (
        <div onClick={showRecording} style={{backgroundColor:`${SecondaryColor}`, margin:"1rem", borderRadius:"1rem", padding:"2rem"}}>
            <h4 style={{color:"white"}}>{recording.title}</h4>
            <p style={{color:"white"}}>Duration: {recording.duration.toString().substring(0, recording.duration.toString().indexOf(".")+3)}</p> {/*limiting to 2 decimal digits */}
            <p style={{color:"white"}}>Date: {recording.created_at.substring(0, recording.created_at.indexOf("T"))}</p>
            <p style={{color:"white"}}>Tags: {tags.map((t)=> t.tag_text)}</p>
            {images && images.length>0 && renderImages()}
            <br/>
            {/* <audio src={recording.pointer} controls style={{height: "35px", margin: "auto"}}/> */}
        
        </div> 
        )
}
export default Recording