import {useState} from "react"
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton, ViewButton} from '../components/Styles.js'
// import Play from "../images/Play.png"
// import Pause from "../images/Pause.png"


const Recording = (props) => {

    const {recording, showRecording, tags, images} = props
    const [playing, setPlaying] = useState(false)


    const renderImages = () => {
        if (images && images.length > 0) {
            return images.map((image) => {
               return <img key={recording.id} src={image.pointer} alt="image" style={{width:"150px", border:"2px solid white", margin:"1rem"}}/>
            })
        }
    }

    // var mPlayer = document.getElementById("background_music"); 
    // var mPlayAction = document.getElementById("playbutton"); 


    // function playAudio() { 
    //     mPlayer.play(); 
    //     setPlaying(true);
    //     mPlayAction.src = {Pause};
    //     // document.getElementsByTagName('audio').addEventListener('playing',()=>setPlaying(false),true);
    // } 

    // function pauseAudio() { 
    //     mPlayer.pause();
    //     setPlaying(false);
    //     mPlayAction.src = {Play};
    // } 
    // function HandleAudio(){
    // if(playing == true){
    //     //Playing already Pause it
    //     pauseAudio();
    // }else{
    //     //Play the music
    //     playAudio();
    // } 
    // }
console.log(recording.pointer)

    return (
        
        <div style={{backgroundColor:`${SecondaryColor}`, borderRadius: "1rem", margin:"1rem", padding:"2rem"}}>
            <h4 style={{color:"white"}}>{recording.title}</h4>
            {/* <p style={{color:"white"}}>{playing.toString()}</p> */}
            <p style={{color:"white"}}>Duration: {recording.duration.toString().substring(0, recording.duration.toString().indexOf(".")+3)}</p> {/*limiting to 2 decimal digits */}
            <p style={{color:"white"}}>Date: {recording.created_at.substring(0, recording.created_at.indexOf("T"))}</p>
            <p style={{color:"white"}}>Tags: {tags.map((t)=> t.tag_text).join(', ')}</p>
            <br/>
            {images && images.length>0 && renderImages()}
            <br/>
            {/* {!playing && <img src={Play} alt="play recording" id="playbutton" onClick={HandleAudio} style={{height:"100px"}}/>}
            {playing && <img src={Pause} alt="pause recording" id="playbutton" onClick={HandleAudio} style = {{height:"100px"}}/>} */}
            <audio controls id="background_music" src = {recording.pointer}/>
            <br/>
            <ViewButton onClick={showRecording}>View Details</ViewButton>
        </div>
        )
}
export default Recording